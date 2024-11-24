// Import React and necessary libraries
import { render } from "@testing-library/react";
import theme from "@styles/theme";
import { ThemeProvider } from "styled-components";
import SearchIcon from "./index"; // Assuming the component is called SearchIcon
import "@testing-library/jest-dom"; // Importing Jest DOM for additional matchers

describe("SearchIcon Component", () => {
	// Test case for default render
	it("renders correctly with default props", () => {
		const { container } = render(<SearchIcon />);
		const svg = container.querySelector("svg");
		const path = container.querySelector("path");

		// Check if SVG is rendered
		expect(svg).toBeInTheDocument();
		expect(svg).toHaveAttribute("width", "24");
		expect(svg).toHaveAttribute("height", "24");
		expect(path).toHaveAttribute("stroke", theme.colors.grey);
	});

	// Test case for custom size prop
	it("renders with custom size", () => {
		const customSize = 50;
		const customColor = "red";
		const { container } = render(
			<ThemeProvider theme={theme}>
				<SearchIcon size={customSize} color={customColor} />
			</ThemeProvider>
		);
		const svg = container.querySelector("svg");
		const path = container.querySelector("path");

		// Check if the size is applied
		expect(svg).toHaveAttribute("width", customSize.toString());
		expect(svg).toHaveAttribute("height", customSize.toString());
		expect(path).toHaveAttribute("stroke", customColor);
	});
});
