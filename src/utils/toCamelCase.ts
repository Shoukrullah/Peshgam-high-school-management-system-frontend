const toCamelCase = (input: string) => {
  const firstCharacter = input.charAt(0);
  const otherCharacters = input.slice(1).toLowerCase();
  return firstCharacter + otherCharacters.replace("_", " ");
};
export default toCamelCase
