#!/usr/bin/env node

import yargs from "yargs/yargs";
import { longScrape } from "./longscrape";
import * as fs from "fs";
import chalk from "chalk";
import { askForName } from "./askForName";

async function main() {
  const argv = await yargs(process.argv.slice(2))
    .command("$0 [url]", "scrape a data.gov.il URL")
    .epilogue(
      "If no [url] is provided, the command reads the links from `links.txt` and loops over them."
    )
    .help()
    .parseAsync();

  if (argv.url) {
    longScrape(argv.url as string);
  } else {
    try {
      const raw = fs.readFileSync("links.txt", "utf-8");

      if (!raw.trim()) throw new Error();

      const name = await askForName();
      console.log();

      for (let line of raw.split("\n").filter(Boolean)) {
        console.log("Starting process for " + chalk.blue(line));
        await longScrape(line, name);
        console.clear();
      }
    } catch (error) {
      console.error(
        chalk.redBright(
          "If no [url] is provided, the file `links.txt` must exist."
        )
      );
    }
  }
}

main();
