export type WordForms = readonly [root: string, plural: string, singular: string, few: string];
export type WordFormIndex = 0 | 1 | 2;

export const joinWord = (input: WordForms, index: WordFormIndex = 0) => {
  return input[0] + input[index + 1];
};
