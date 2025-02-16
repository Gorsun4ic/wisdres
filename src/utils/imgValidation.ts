// Check if the image type match one of the allowed types
export const imageTypes: string[] = [
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

export const validateImageType = (fileName: string): boolean => {
	return imageTypes.some((type) =>
		fileName?.trim().toLowerCase().endsWith(`.${type?.toLowerCase()}`)
	);
};
