import chalk from "chalk";
import { Page } from "puppeteer";

export async function getResourceCount(page: Page) {
  console.log(chalk.bold("Getting resource count..."));

  const count = await page.$$eval(
    "ul.resource-list li.resource-item",
    (els) => els.length
  );

  return count;
}
