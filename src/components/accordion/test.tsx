// Accordion.test.tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest"; // Using Vitest's describe, it, expect, and vi for mocks
import { ThemeProvider } from "styled-components";
import theme from "@styles/theme";
import Accordion from "@components/accordion";
import Checkbox from "@components/checkbox";
import "@testing-library/jest-dom"; // Imp

describe("Accordion Component", () => {
	it("renders with the correct title", () => {
		const title = "Title text";
		render(
			<ThemeProvider theme={theme}>
				<Accordion id="first-accordion" title={title}>
					Some text
				</Accordion>
			</ThemeProvider>
		);
		expect(screen.getByText(title)).toBeInTheDocument();
	});
	it("renders with the correct text content", () => {
		const title = "Title text";
		const content = "Some text";
		render(
			<ThemeProvider theme={theme}>
				<Accordion id="first-accordion" title={title}>
					{content}
				</Accordion>
			</ThemeProvider>
		);
		expect(screen.getByText(content)).toBeInTheDocument();
	});
	it("renders with the correct component content", () => {
		const title = "Title text";
		const label = "Some label";
		const content = <Checkbox label={label} />;
		render(
			<ThemeProvider theme={theme}>
				<Accordion id="first-accordion" title={title}>
					{content}
				</Accordion>
			</ThemeProvider>
		);
		expect(screen.getByText(label)).toBeInTheDocument();
	});
});
