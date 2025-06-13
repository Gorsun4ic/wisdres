import { useState, useEffect } from "react";



import { validateImageType } from "@utils/imgValidation";

const regex = /.*img.*/;

const findAllImgFields = (data: any, results: string[] = []): string[] => {
	if (!data || typeof data !== "object") return results;

	for (const key in data) {
		if (regex.test(key) && typeof data[key] === "string") {
			results.push(data[key]); // ✅ add to results
		}
		// 🔁 go deeper into nested objects
		findAllImgFields(data[key], results);
	}

	return results;
};

const useWatchImg = (watch: () => any) => {
	const [imgs, setImgs] = useState<string[]>([]);
	const formValues = watch();

	useEffect(() => {
		const allImgs = findAllImgFields(formValues); // get all image values
		const validImgs = allImgs.filter(validateImageType); // check they're real images
		setImgs(validImgs); // save them
	}, [formValues]);

	return { imgs }; // ✅ an array of image URLs
};

export default useWatchImg;
