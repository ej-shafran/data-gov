import { ExtractedResults } from "../extract";
import { confirmAnswers } from "./confirmAnswers";
import { inputAnswers } from "./inputAnswers";

export async function input(data: ExtractedResults) {
  const confirmed = await confirmAnswers(data);
  const userInput = await inputAnswers();

  return {
    ...confirmed,
    ...userInput,
  };
}
