import { exec as rawExec } from "child_process";
import { promisify } from "util";

export const exec = promisify(rawExec);
