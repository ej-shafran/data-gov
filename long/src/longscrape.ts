import chalk from "chalk";
import puppeteer from "puppeteer";
import { extract } from "./extract";

export async function longFetch(url: string) {
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
  const data = await extract(browser, page);

  // start prompting here!
  console.log(data);

  return process.exit(0);
}
