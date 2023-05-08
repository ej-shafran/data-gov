import chalk from "chalk";
import { Page } from "puppeteer";

export async function getDescription(page: Page) {
  console.log(chalk.bold("Getting description..."));

  try {
    const desc = await page.$eval(
      ".notes.embedded-content",
      (el) => el.textContent
    );

    return desc?.trim() ?? "";
  } catch (error) {
    return "";
  }
}
