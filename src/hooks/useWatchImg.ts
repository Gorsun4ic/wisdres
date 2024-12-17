// Show img put in form

import { useState, useEffect } from "react";

const useWatchImg = (watch: (arg0: string) => string) => {
	const [img, setImg] = useState<string | null | undefined>(undefined);
	const watchImg = watch("img");

	const imageTypes: string[] = [
		"jpeg",
		"png",
		"gif",
		"webp",
		"bmp",
		"svg+xml",
		"tiff",
		"heif",
		"heic",
		"jpg",
	];

	const styledImageTypes = imageTypes.map((item, index, arr) => {
		return ` ${item}`;
	})

	const imgTypeError: string = `Image must have one of these types: ${styledImageTypes}.`;

	// Check if the image type is valid
	const isValidImageType = (fileName: string): boolean => {
		return imageTypes.some((type) =>
			fileName?.trim().toLowerCase().endsWith(`.${type.toLowerCase()}`)
		);
	};

	useEffect(() => {
		if (watchImg && isValidImageType(watchImg)) {
			setImg(watchImg); // Set the image if it's valid
		} else {
			setImg(null);
		}
	}, [watchImg]);

	return { img, isValidImageType, imgTypeError };
};

export default useWatchImg;
