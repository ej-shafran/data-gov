import { Page } from "puppeteer";

export async function getResourceCount(page: Page) {
  console.log("Getting resource count...");

  const count = await page.$$eval("ul.resource-list", (els) => els.length);

  return count;
}
