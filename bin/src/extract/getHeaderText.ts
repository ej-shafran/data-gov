import { Page } from "puppeteer";
import chalk from "chalk";

export async function getHeaderText(page: Page) {
  console.log(chalk.bold("Getting header text:"));

  const h1 = await page.$eval("h1", (el) => el.textContent);

  if (!h1) {
    console.error(chalk.redBright("Could not find h1 element on page."));
    return process.exit(1);
  }
  return h1.trim();
}
