import File from "@custom-types/file";

const readJSON = (file: File) => {
	const allowedTypes = ["application/json"];

	if (!allowedTypes.includes(file.type)) return null;

	return new Promise((resolve, reject) => {
		const reader = new FileReader();

		reader.onload = () => {
			try {
				const json = JSON.parse(reader.result as string);
				resolve(json);
			} catch (err) {
				reject(err);
			}
		};

		reader.onerror = () => {
			reject(reader.error);
		};

		reader.readAsText(file);
	});
};

export default readJSON;