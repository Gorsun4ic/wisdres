interface Theme {
	colors: Record<string, string>; // More specific type for colors
	fontWeights?: Record<string, string>; // More specific type for fontWeights
	borders?: Record<string, string>; // More specific type for borders
	fontSizes?: Record<string, string>;
}

const theme: Theme = {
	colors: {
		black: "#000",
		grey: "#7A7A7A",
		darkGrey: "#D9D9D9",
		formBackground: "#F6F6F6",
		yellow: "#FFCD36",
		white: "#fff",
		green: "#5EB168",
		darkGreen: "#519a5a",
	},
	fontWeights: {
		bold: "700",
		medium: "500",
		regular: "400",
	},
	fontSizes: {
		default: "1rem",
		h1: "2.25rem",
		h2: "1.75rem",
		h3: "1.25rem",
		h4: "1.125rem",
	},
	borders: {
		borderRadius: "2px",
		mainBorder: "1px",
		lightBorder: "0.5px",
	},
};

export default theme;
