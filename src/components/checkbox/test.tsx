// Checkbox.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest"; // Using Vitest's describe, it, expect, and vi for mocks
import { ThemeProvider } from "styled-components";
import theme from "@styles/theme";
import "@testing-library/jest-dom"; // Importing jest-dom for custom matchers
import Checkbox from "@components/checkbox";

describe("Checkbox Component", () => {
	it("renders with the correct label", () => {
		const text = "Accept Terms";
		render(
			<ThemeProvider theme={theme}>
				<Checkbox label={text} />
			</ThemeProvider>
		);
		expect(screen.getByText(text)).toBeInTheDocument();
	});

	it("renders the checkbox element", () => {
		render(
			<ThemeProvider theme={theme}>
				<Checkbox label="Accept Terms" />
			</ThemeProvider>
		);
		// Check if the checkbox input is rendered
		const checkbox = screen.getByRole("checkbox");
		expect(checkbox).toBeInTheDocument();
	});

	it("handles user interaction", () => {
		render(
			<ThemeProvider theme={theme}>
				<Checkbox label="Accept Terms" />
			</ThemeProvider>
		);
		const checkbox = screen.getByRole("checkbox");

		// Check the checkbox
		fireEvent.click(checkbox);
		expect(checkbox).toBeChecked();

		// Uncheck the checkbox
		fireEvent.click(checkbox);
		expect(checkbox).not.toBeChecked();
	});
});
