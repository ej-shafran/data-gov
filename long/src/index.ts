#!/usr/bin/env node

import yargs from "yargs/yargs";
import { longFetch } from "./longscrape";

const argv = yargs(process.argv.slice(2))
  .option("u", {
    alias: "url",
    demandOption: true,
    type: "string",
    desc: "URL to scrape the data from.",
  })
  .parseSync();

longFetch(argv.u);