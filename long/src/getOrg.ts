import { Page } from 'puppeteer';
import chalk from 'chalk';

export async function getOrg(page: Page) {
  console.log("Getting originization...");

  const org = await page.$eval(".breadcrumb li:nth-child(2) a", el => el.textContent);

  if (!org) {
    console.error(chalk.redBright("Could not find second link in breadcrumb."));
    return process.exit(1);
  }

  return org.trim();
}
