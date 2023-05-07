import chalk from "chalk";
import { ExtractedResults } from "../extract";
import inquirer from "inquirer";

export async function input(results: ExtractedResults) {
  const answers = await inquirer.prompt([
    {
      type: "confirm",
      message: `Is ${chalk.blue(results.name)} the correct ${chalk.yellow(
        "collection name"
      )}?`,
      name: "name",
    },
    {
      type: "confirm",
      message: `Is ${chalk.blue(results.org)} the correct ${chalk.yellow(
        "orginization name"
      )}?`,
      name: "org",
    },
    {
      type: "confirm",
      message: `Is ${chalk.blue(
        results.description
      )} the correct ${chalk.yellow("description")}?`,
      name: "description",
    },
    {
      type: "confirm",
      message: `Is ${chalk.blue(results.updateRate)} the correct ${chalk.yellow(
        "update rate"
      )}?`,
      name: "updateRate",
    },
    {
      type: "confirm",
      message: `Is ${chalk.blue(
        results.updateMethod
      )} the correct ${chalk.yellow("update method")}?`,
      name: "updateMethod",
    },
    {
      type: "confirm",
      message: `Is "${chalk.blue(results.formats)}" the correct ${chalk.yellow(
        "list of resource formats"
      )}?`,
      name: "formats",
    },
    {
      type: "confirm",
      message: `Is ${chalk.blue(
        results.hasAPI
      )} the correct answer to "Has API?"`,
      name: "hasAPI",
    },
  ]);

  console.log(answers);
}
