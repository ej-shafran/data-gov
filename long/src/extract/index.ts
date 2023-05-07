import { Page } from "puppeteer";
import { getOrg } from "./getOrg";
import { getHeaderText } from "./getHeaderText";
import { getDescription } from "./getDescription";
import { getResourceCount } from "./getResourceCount";
import { getUpdateMethod } from "./getUpdateMethod";
import { getUpdateRate } from "./getUpdateRate";

export type Results = {
  url: string;
  org: string;
  name: string;
  description: string;
  resourceCount: number;
  updateRate: string;
  updateMethod: string;
  formats: string;
  hasAPI: "יש" | "אין";

  areasOfFocus: "חינוך" | "תעסוקה" | "יוקר המחיה" | "איכות הסביבה";
  latestUpdate: string;
  yearRangeForComparison: string;
  useful: "שימושי" | "לא שימושי";
  notes: string;
  testerName: string;
};

export async function extract(page: Page): Promise<Results> {
  const [url, org, name, description, resourceCount, updateMethod, updateRate] =
    await Promise.all([
      page.url(),
      getOrg(page),
      getHeaderText(page),
      getDescription(page),
      getResourceCount(page),
      getUpdateMethod(page),
      getUpdateRate(page),
    ]);

  return {
    url,
    org,
    name,
    description,
    resourceCount,
    updateRate,
    updateMethod,
  } as any;
}
