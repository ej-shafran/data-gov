import chalk from "chalk";
import puppeteer from "puppeteer";
import { extract } from "./extract";
import { FullResults, input } from "./input";
import { exec } from "./exec";
import { reconfirm } from "./input/reconfirm";
import { askForName } from "./askForName";
import * as fs from "fs/promises";

const delay = (seconds: number) =>
  new Promise((res) => setTimeout(res, seconds * 1000));

export async function longScrape(url: string, priorName?: string) {
  console.clear();

  const name = priorName ?? (await askForName());

  console.log(
    chalk.bold(`Loading new ${chalk.green("puppeteer")} instance...`)
  );
  console.log();
  const browser = await puppeteer.launch({ headless: "new" });

  console.log(chalk.bold(`Opening new page...`));
  console.log();
  const page = await browser.newPage();

  console.log(chalk.bold(`Setting ${chalk.yellow("User-Agent")} header...`));
  console.log();
  await page.setUserAgent("datagov-external-client");

  console.log(chalk.bold(`Visiting ${chalk.blue(url)}...`));
  console.log();
  await page.goto(url, { waitUntil: "networkidle0" });

  console.log(
    chalk.bold(`Extracting all easily readable data from ${chalk.blue(url)}...`)
  );
  console.log();
  const data = await extract(page);
  console.log();

  console.log(
    chalk.bold(
      `Opening ${chalk.blue(url)} in ${chalk.green("Google Chrome")}...`
    )
  );
  await delay(2);
  await exec(`google-chrome ${url}`);
  let results: FullResults | null = null;
  let confirmation = false;

  while (!confirmation) {
    console.log();
    results = await input(data);

    console.log();
    confirmation = await reconfirm(name, results);

    if (!confirmation) console.clear();
  }

  // do stuff with results
  console.clear();
  console.log(chalk.bold(`Outputing result to ${chalk.grey("output.csv")}...`));
  console.log();
  await fs.appendFile(
    "output.csv",
    `${results!.url},${results!.org.split('"').join('\\"')},${results!.name
      .split('"')
      .join('\\"')},"${results!.description.split('"').join('\\"')}",${results!.resourceCount
      },${results!.latestUpdate},${results!.updateRate},${results!.updateMethod
      },${results!.yearRangeForComparison},${results!.hasAPI},"${results!.formats
      }","${results!.areasOfFocus}",${results!.useful},${results!.notes},${name}`
      .split("\n")
      .join("\t") + "\n"
  );
  await delay(2);

  console.log(chalk.bold(`Closing ${chalk.green("puppeteer")} instance...`));
  console.log();
  await browser.close();

  await delay(1);
}
