/**
 * @jest-environment jsdom
 */

const capitalize = (text: string) => {
  if (text.length === 0) {
    return "";
  }

  const words = text.split(" ");

  const capitalizeWord = (word: string) => {
    const firstLetter = word[0];

    const otherLetters = word.substring(1);

    return `${firstLetter.toLowerCase()}${otherLetters}`
  }
  
  return words.map(capitalizeWord).join(" "); 
}

describe("Sanity of formatter", () => {
    test("Should return Igor for igor", () => {
      expect(capitalize('igor')).toBe('Igor');
    })

    test("Should return Igor Silva for igor silva", () => {
      expect(capitalize('igor silva')).toBe('Igor');
    })

});
