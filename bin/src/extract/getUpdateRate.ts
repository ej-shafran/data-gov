import { Page } from "puppeteer";
import chalk from "chalk";

export async function getUpdateRate(page: Page) {
  console.log(chalk.bold("Getting update rate..."));

  const text = await page.$eval(
    "tbody tr:nth-child(3) td.dataset-details",
    (el) => el.textContent
  );

  if (!text) {
    console.error(
      chalk.redBright("Could not find `Update Rate` column in table.")
    );
    return process.exit(1);
  }

  return text;
}
