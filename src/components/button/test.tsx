// Button.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest"; // Using Vitest's describe, it, expect, and vi for mocks
import "@testing-library/jest-dom"; // Importing jest-dom for custom matchers
import Button from "@components/button";

// Mock the StyledButton to ensure it renders correctly using Vitest
vi.mock("./style", () => ({
	StyledButton: ({ children, ...props }: { children: React.ReactNode }) => (
		<button {...props}>{children}</button>
	),
}));

describe("Button Component", () => {
	it("renders with correct text content", () => {
		render(<Button size="small">Click Me</Button>);
		expect(screen.getByRole("button")).toHaveTextContent("Click Me");
	});

	it("applies the contained variant by default", () => {
		render(<Button size="small">Contained Button</Button>);
		expect(screen.getByRole("button")).toHaveAttribute("variant", "contained");
	});

	it("matches snapshot", () => {
		const { asFragment } = render(<Button size="big">Snapshot Button</Button>);
		expect(asFragment()).toMatchSnapshot();
	});
});
