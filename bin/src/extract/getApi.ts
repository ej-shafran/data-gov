import chalk from "chalk";
import { Page } from "puppeteer";

export async function getHasApi(page: Page) {
  console.log(chalk.bold("Checking whether there's an API..."));

  const formats = await page.$$eval("[data-format]", (els) =>
    els.map((el) => el.getAttribute("data-format"))
  );

  const hasApi = formats.some(
    (format) => format && ["xls", "xlsx", "csv"].includes(format.toLowerCase())
  );

  return !!hasApi ? "יש" : "אין";
}
