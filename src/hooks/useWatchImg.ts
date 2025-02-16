// Show img put in form

import { useState, useEffect } from "react";
import { validateImageType } from "@utils/imgValidation";

const useWatchImg = (watch: (arg0: string) => string) => {
	const [img, setImg] = useState<string | null | undefined>(undefined);
	const watchImg = watch("img");

	useEffect(() => {
		if (watchImg && validateImageType(watchImg)) {
			setImg(watchImg); // Set the image if it's valid
		} else {
			setImg(null);
		}
	}, [watchImg]);

	return { img };
};

export default useWatchImg;
