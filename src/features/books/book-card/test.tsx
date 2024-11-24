// Book-card.test.tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest"; // Using Vitest's describe, it, expect, and vi for mocks
import "@testing-library/jest-dom"; // Importing jest-dom for custom matchers
import BookCard from "@features/books/book-card";
import { IBookInfo } from "@custom-types/book";
import theme from "@styles/theme";
import { ThemeProvider } from "styled-components";

describe("BookCard Component", () => {
	it("renders with the correct data", () => {
		const data: IBookInfo = {
			img: "https://m.media-amazon.com/images/I/6158m1qLqFL._AC_UF1000,1000_QL80_.jpg",
			rating: 10,
			title: "Book title",
			author: "Authors name",
			publisher: "Some publisher",
			language: "English",
			year: 2017,
			pages: 348,
		};

		const { container } = render(
			<ThemeProvider theme={theme}>
				<BookCard data={data} />
			</ThemeProvider>
		);

		const img = container.querySelector(".book-card__img");

		expect(screen.getByText(data.rating)).toBeInTheDocument(); // Rating
		expect(screen.getByText(data.title)).toBeInTheDocument(); // Book name
		expect(screen.getByText(data.author)).toBeInTheDocument(); // Authors name
		expect(img).toHaveAttribute("src", data.img);
	});
});
