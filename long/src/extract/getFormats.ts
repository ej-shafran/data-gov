import { Page } from "puppeteer";

export async function getFormats(page: Page) {
  console.log("Getting formats...");

  const formatSet = new Set<string>();

  const formats = await page.$$eval("[data-format]", (els) =>
    els.map((el) => el.getAttribute("data-format"))
  );

  for (let format of formats) {
    if (format) formatSet.add(format);
  }

  return [...formatSet].join(",");
}
