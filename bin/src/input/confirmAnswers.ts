import chalk from "chalk";
import { ExtractedResults } from "../extract";
import inquirer, { Question } from "inquirer";

type ConfirmAnswers = {
  [P in keyof ExtractedResults]: boolean;
};

const ResultToMessage = {
  name: "dataset name",
  org: "orginization name",
  description: "description",
  updateRate: "update rate",
  updateMethod: "update method",
  formats: "list of resource formats",
  resourceCount: "resource count",
};

export async function confirmAnswers(results: ExtractedResults) {
  const confirmAnswers: ConfirmAnswers = await inquirer.prompt([
    {
      type: "confirm",
      message: `Is ${chalk.blue(results.name)} the correct ${chalk.yellow(
        ResultToMessage.name
      )}?`,
      name: "name",
    },
    {
      type: "confirm",
      message: `Is ${chalk.blue(results.org)} the correct ${chalk.yellow(
        ResultToMessage.org
      )}?`,
      name: "org",
    },
    {
      type: "confirm",
      message: `Is ${chalk.blue(results.description)} the correct ${ResultToMessage.description
        }?`,
      name: "description",
    },
    {
      type: "confirm",
      message: `Is the ${chalk.yellow(
        ResultToMessage.resourceCount
      )} ${chalk.blue(results.resourceCount)}?`,
      name: "resourceCount",
    },
    {
      type: "confirm",
      message: `Is ${chalk.blue(results.updateRate)} the correct ${chalk.yellow(
        ResultToMessage.updateRate
      )}?`,
      name: "updateRate",
    },
    {
      type: "confirm",
      message: `Is ${chalk.blue(
        results.updateMethod
      )} the correct ${chalk.yellow(ResultToMessage.updateMethod)}?`,
      name: "updateMethod",
    },
    {
      type: "confirm",
      message: `Is "${chalk.blue(results.formats)}" the correct ${chalk.yellow(
        ResultToMessage.formats
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

  let questions: Question[] = [];
  let final = {} as any;
  for (let key in confirmAnswers) {
    if (confirmAnswers[key as keyof ConfirmAnswers]) {
      final[key] = results[key as keyof ExtractedResults];
    } else if (key === "hasAPI") {
      final[key] = !confirmAnswers[key];
    } else {
      questions.push({
        type: "input",
        name: key,
        message: `Please enter the ${chalk.yellow(
          ResultToMessage[key as keyof typeof ResultToMessage]
        )}:`,
        validate(input) {
          return !!input || "REQUIRED";
        },
      });
    }
  }

  const rest = await inquirer.prompt(questions);
  rest.hasAPI = !rest.hasAPI ? "יש" : "אין";

  return {
    ...final,
    ...rest,
  } as ExtractedResults;
}
