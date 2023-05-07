import { Page } from "puppeteer";
import { getOrg } from "./getOrg";
import { getHeaderText } from "./getHeaderText";
import { getDescription } from "./getDescription";
import { getResourceCount } from "./getResourceCount";
import { getUpdateMethod } from "./getUpdateMethod";
import { getUpdateRate } from "./getUpdateRate";
import { getFormats } from "./getFormats";
import { getHasApi } from "./getApi";

export type ExtractedResults = {
  url: string;
  org: string;
  name: string;
  description: string;
  resourceCount: number;
  updateRate: string;
  updateMethod: string;
  formats: string;
  hasAPI: "יש" | "אין";
};

export async function extract(
  page: Page
): Promise<ExtractedResults> {
  const [
    url,
    org,
    name,
    description,
    resourceCount,
    updateMethod,
    updateRate,
    formats,
    hasAPI,
  ] = await Promise.all([
    page.url(),
    getOrg(page),
    getHeaderText(page),
    getDescription(page),
    getResourceCount(page),
    getUpdateMethod(page),
    getUpdateRate(page),
    getFormats(page),
    getHasApi(page),
  ]);

  return {
    url,
    org,
    name,
    description,
    resourceCount,
    updateRate,
    updateMethod,
    formats,
    hasAPI,
  };
}
