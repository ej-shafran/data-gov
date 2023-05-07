import chalk from "chalk";
import { Page } from "puppeteer";

export async function getUpdateMethod(page: Page) {
  console.log(chalk.bold("Getting update method..."));

  const text = await page.$eval(
    "tbody tr:nth-child(4) td.dataset-details",
    (el) => el.textContent
  );

  if (!text) {
    console.error(chalk.redBright("Could not find `Update Method` in table."));
    return process.exit(1);
  }

  return text;
}
