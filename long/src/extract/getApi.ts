import chalk from "chalk";
import { Browser, Page } from "puppeteer";

export async function getHasApi(browser: Browser, page: Page) {
  console.log("Checking whether there's an API...");

  const href = await page.$eval(".resource-item a.btn", (el) =>
    el.getAttribute("href")
  );

  if (!href) {
    console.error(chalk.redBright("Could not find Eye icon in page."));
    return process.exit(1);
  }

  const newPage = await browser.newPage();
  await newPage.setUserAgent("datagov-external-client");
  await newPage.goto(`https://data.gov.il/${href}`, {
    waitUntil: "networkidle0",
  });

  const apiBtn = await newPage.$('[data-module="gov-api-info"]');

  return !!apiBtn ? "יש" : "אין";
}
