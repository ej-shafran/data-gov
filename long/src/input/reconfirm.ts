import asTable from "as-table";
import { FullResults } from "./index";
import chalk from "chalk";
import inquirer from "inquirer";

const ResultToLabel = {
  org: "Orginization",
  name: "Dataset Name",
  description: "Description",
  resourceCount: "Resource Count",
  updateRate: "Update Rate",
  updateMethod: "Update Method",
  formats: "Resource Formats",
  hasAPI: "Has an API?",
  areasOfFocus: "Areas of Focus",
  latestUpdate: "Latest Update",
  yearRangeForComparison: "Year Range",
  useful: "Useful",
  notes: "Notes",
};

export async function reconfirm(testerName: string, results: FullResults) {
  const table: { KEY: string; VALUE: string }[] = [];

  for (let [_key, value] of Object.entries(results)) {
    let key = _key as keyof FullResults;
    if (key === "url") continue;

    table.push({ KEY: ResultToLabel[key], VALUE: `${value}` });
  }

  console.log(
    `Would you say the following summarizes the Dataset at ${chalk.blue(
      results.url
    )}?`
  );
  console.log();
  console.log("Name: " + testerName);
  console.log();
  console.log(asTable(table));
  console.log();

  const { confirmed } = await inquirer.prompt([
    {
      name: "confirmed",
      type: "confirm",
      message: "Confirm: ",
    },
  ]);

  return !!confirmed;
}
