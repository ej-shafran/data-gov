import chalk from "chalk";
import inquirer from "inquirer";

type UserInput = {
  areasOfFocus: string;
  latestUpdate: string;
  yearRangeForComparison: string;
  useful: "שימושי" | "לא שימושי";
  notes: string;
};

type RawInput = Omit<UserInput, "useful" | "areasOfFocus"> & {
  useful: boolean;
  areasOfFocus: ("חינוך" | "תעסוקה" | "יוקר המחיה" | "איכות הסביבה")[];
};

export async function inputAnswers(): Promise<UserInput> {
  const { useful, areasOfFocus, yearRangeForComparison, ...answers }: RawInput =
    await inquirer.prompt([
      {
        type: "checkbox",
        choices: ["חינוך", "תעסוקה", "יוקר המחיה", "איכות הסביבה"],
        name: "areasOfFocus",
        message: `Which of these ${chalk.yellow("areas of focus")} apply?`,
      },
      {
        type: "input",
        message: `What is the ${chalk.yellow(
          "latest update"
        )}? (Be sure to check the actual files)`,
        name: "latestUpdate",
        validate(input) {
          if (!input) return "REQUIRED";

          const isDate =
            /(0?[1-9]|[12][0-9]|3[01])\.(0?[1-9]|1[012])\.[0-9]{4}/.test(input);

          if (!isDate) return "MUST BE A DATE IN THE FORM DD.MM.YYYY";

          return true;
        },
      },
      {
        type: "input",
        message: `What is the ${chalk.yellow("relevant year range")}?`,
        name: "yearRangeForComparison",
      },
      {
        type: "confirm",
        message: `Is this dataset ${chalk.yellow("useful")}?`,
        name: "useful",
      },
      {
        type: "input",
        message: "Additional notes:",
        name: "notes",
      },
    ]);

  return {
    useful: useful ? "שימושי" : "לא שימושי",
    areasOfFocus: areasOfFocus.join(","),
    yearRangeForComparison: yearRangeForComparison || "אין מידע היסטורי",
    ...answers,
  };
}
