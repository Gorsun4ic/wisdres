import { useState, useEffect } from "react";



import { validateImageType } from "@utils/imgValidation";

const regex = /.*img.*/;

const findImgField = (data: any): string | null => {
	if (!data) return null;

	if (typeof data === "object") {
		for (const key in data) {
			if (regex.test(key) && typeof data[key] === "string") {
				return data[key]; // Return the first matching "img" field
			}
			const nestedResult = findImgField(data[key]); // Search deeper
			if (nestedResult) return nestedResult;
		}
	}
	return null;
};

const useWatchImg = (watch: () => any) => {
	const [img, setImg] = useState<string | null | undefined>(undefined);
	const formValues = watch();

	useEffect(() => {
		const matchedImg = findImgField(formValues);
		setImg(matchedImg && validateImageType(matchedImg) ? matchedImg : null);
	}, [formValues]);

	return { img };
};

export default useWatchImg;
