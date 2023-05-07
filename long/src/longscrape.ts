import chalk from "chalk";
import puppeteer from "puppeteer";
import { extract } from "./extract";
import { input } from "./input";
import { exec } from "./exec";

const delay = (seconds: number) =>
  new Promise((res) => setTimeout(res, seconds * 1000));

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
  console.log();
  const data = await extract(browser, page);

  console.log(
    `Opening ${chalk.blue(url)} in ${chalk.green("Google Chrome")}...`
  );
  await delay(2);
  await exec(`google-chrome ${url}`);

  console.log();
  const results = await input(data);

  console.log();
  console.log(results);

  return process.exit(0);
}
