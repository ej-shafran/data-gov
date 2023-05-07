import { ExtractedResults } from "../extract";
import { confirmAnswers } from "./confirmAnswers";
import { inputAnswers } from "./inputAnswers";

export type FullResults = Awaited<ReturnType<typeof input>>;

export async function input(data: ExtractedResults) {
  const confirmed = await confirmAnswers(data);
  const userInput = await inputAnswers();

  return {
    ...confirmed,
    ...userInput,
    url: data.url,
  };
}
