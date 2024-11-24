// Genre-card.test.tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest"; // Using Vitest's describe, it, expect, and vi for mocks
import "@testing-library/jest-dom"; // Importing jest-dom for custom matchers
import GenreCard from "@features/genres/genre-card";
import theme from "@styles/theme";
import { ThemeProvider } from "styled-components";

describe("GenreCard Component", () => {
	it("renders with the correct data", () => {
		const data: { img: string; genreName: string } = {
			img: "https://m.media-amazon.com/images/I/6158m1qLqFL._AC_UF1000,1000_QL80_.jpg",
			genreName: "Mystery & Thriller",
		};

		const { container } = render(
			<ThemeProvider theme={theme}>
				<GenreCard img={data.img} genreName={data.genreName} />
			</ThemeProvider>
		);

		const img = container.querySelector(".genre-card__img");

		expect(screen.getByText(data.genreName)).toBeInTheDocument(); // Genre name
		expect(img).toHaveAttribute("src", data.img); // Img source
		expect(img).toHaveAttribute("alt", data.genreName); // Img alt text
		expect(img).toHaveAttribute("height", "180"); // Img height
		expect(img).toHaveAttribute("width", "130"); // Img width
	});
});
