// @ts-expect-error Cuz it's old library and it's have type any, but it's strings array
import badwordsArray from "badwords/array";

const containsBadWords = (input: string): boolean => {
	const regex = new RegExp(`\\b(${badwordsArray.join("|")})\\b`, "i");
	return regex.test(input);
};

export default containsBadWords;
