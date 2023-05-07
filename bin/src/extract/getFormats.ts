import { Page } from "puppeteer";

export async function getFormats(page: Page) {
  console.log("Getting formats...");

  const formats = await page.$$eval("[data-format]", (els) =>
    els.map((el) => el.getAttribute("data-format"))
  );

  const formatSet = new Set<string>(
    formats.filter((format): format is string => !!format)
  );

  return [...formatSet].join(",");
}
