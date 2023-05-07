#!/usr/bin/env node

import yargs from "yargs/yargs";
import chalk from "chalk";
import puppeteer from "puppeteer";

async function longFetch(url: string, screenshot?: boolean) {
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

  // console.log("Getting header text:");
  //
  // const h1 = await page.$eval("h1", (el) => el.textContent);
  //
  // if (!h1) {
  //   console.error(chalk.redBright("Could not find h1 element on page."));
  //   return process.exit(1);
  // }
  //
  // console.log(JSON.stringify(h1.trim()));

  return process.exit(0);
}

const argv = yargs(process.argv.slice(2))
  .option("u", {
    alias: "url",
    demandOption: true,
    type: "string",
  })
  .option("s", {
    alias: "screenshot",
    type: "boolean",
  })
  .parseSync();

longFetch(argv.u, argv.s);
