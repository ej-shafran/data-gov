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

  console.log(`Loading new ${chalk.green("puppeteer")} instance...`);
  console.log();
  const browser = await puppeteer.launch({ headless: "new" });

  console.log(`Opening new page...`);
  console.log();
  const page = await browser.newPage();

  console.log(`Setting ${chalk.yellow("User-Agent")} header...`);
  console.log();
  await page.setUserAgent("datagov-external-client");

  console.log(`Visiting ${chalk.blue(url)}...`);
  console.log();
  await page.goto(url, { waitUntil: "networkidle0" });

  console.log(`Extracting all easily readable data from ${chalk.blue(url)}...`);
  console.log();
  const data = await extract(page);
  console.log();

  console.log(
    `Opening ${chalk.blue(url)} in ${chalk.green("Google Chrome")}...`
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
  console.log(`Outputing result to ${chalk.grey("output.csv")}...`);
  console.log();
  await fs.appendFile(
    "output.csv",
    `${results!.url},${results!.org},${results!.name},"${results!.description
    }",${results!.resourceCount},${results!.latestUpdate},${results!.updateRate
    },${results!.updateMethod},${results!.yearRangeForComparison},${results!.hasAPI
    },"${results!.formats}","${results!.areasOfFocus}",${results!.useful},${results!.notes
    },${name}`
  );
  await delay(1);

  console.log(`Closing ${chalk.green("puppeteer")} instance...`);
  console.log();
  await browser.close();
}
