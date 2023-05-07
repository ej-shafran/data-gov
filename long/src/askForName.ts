import inquirer from "inquirer";

export async function askForName() {
  const { name } = await inquirer.prompt([
    { message: "Enter your name: ", type: "input", name: "name" },
  ]);

  return name;
}
