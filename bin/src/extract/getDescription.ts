import chalk from "chalk";
import { Page } from "puppeteer";

export async function getDescription(page: Page) {
  console.log(chalk.bold("Getting description..."));

  const desc = await page.$eval(
    ".notes.embedded-content",
    (el) => el.textContent
  );

  if (!desc) {
    console.error("Could not find `.notes.embedded-content`.");
    return process.exit(1);
  }

  return desc.trim();
}
