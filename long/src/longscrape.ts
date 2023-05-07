import chalk from "chalk";
import puppeteer from "puppeteer";

import { getHeaderText } from "./getHeaderText";
import { getOrg } from "./getOrg";
import { getDescription } from "./getDescription";
import { getUpdateRate } from "./getUpdateRate";
import { getUpdateMethod } from "./getUpdateMethod";

export async function longFetch(url: string, screenshot?: boolean) {
  console.log(`Loading new ${chalk.green("puppeteer")} instance...`);
  const browser = await puppeteer.launch({ headless: "new" });

  console.log(`Opening new page...`);
  const page = await browser.newPage();

  console.log(`Setting ${chalk.yellow("User-Agent")} header...`);
  await page.setUserAgent("datagov-external-client");

  console.log(`Visiting ${chalk.blue(url)}...`);
  await page.goto(url, { waitUntil: "networkidle0" });

  if (screenshot) {
    console.log(`Taking a screenshot...`);
    await page.screenshot({ path: "temp.png" });
  }

  const name = await getHeaderText(page);
  console.log(`Name: ${chalk.green(name)}`);

  const org = await getOrg(page);
  console.log(`Org: ${chalk.green(org)}`);

  const desc = await getDescription(page);
  console.log(`Description: ${chalk.green(desc)}`);

  const updateRate = await getUpdateRate(page);
  console.log(`Update Rate: ${chalk.green(updateRate)}`);

  const updateMethod = await getUpdateMethod(page);
  console.log(`Update Method: ${chalk.green(updateMethod)}`);

  return process.exit(0);
}
