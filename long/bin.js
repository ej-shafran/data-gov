#!/usr/bin/env node
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/longscrape.ts
var import_yargs = __toESM(require("yargs/yargs"));
var import_chalk = __toESM(require("chalk"));
var import_puppeteer = __toESM(require("puppeteer"));
function longFetch(url, screenshot) {
  return __async(this, null, function* () {
    console.log(`Loading new ${import_chalk.default.green("puppeteer")} instance...`);
    const browser = yield import_puppeteer.default.launch({ headless: "new" });
    console.log(`Opening new page...`);
    const page = yield browser.newPage();
    console.log(`Setting ${import_chalk.default.yellow("User-Agent")} header...`);
    yield page.setUserAgent("datagov-external-client");
    console.log(`Visiting ${import_chalk.default.blue(url)}...`);
    yield page.goto(url, { waitUntil: "networkidle0" });
    if (screenshot) {
      console.log(`Taking a screenshot...`);
      yield page.screenshot({ path: "temp.png" });
    }
    console.log("Getting header text:");
    const h1 = yield page.$eval("h1", (el) => el.textContent);
    if (!h1) {
      console.error(import_chalk.default.redBright("Could not find h1 element on page."));
      return process.exit(1);
    }
    console.log(JSON.stringify(h1.trim()));
    return process.exit(0);
  });
}
var argv = (0, import_yargs.default)(process.argv.slice(2)).option("u", {
  alias: "url",
  demandOption: true,
  type: "string"
}).option("s", {
  alias: "screenshot",
  type: "boolean"
}).parseSync();
longFetch(argv.u, argv.s);
