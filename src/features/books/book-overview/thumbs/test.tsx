// Thumbs.test.tsx
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Thumbs from "./index"; // import your component here

// Mock `useGetAmount` hook
vi.mock("@hooks/useGetAmount", () => ({
	default: vi.fn(() => 5),
}));

describe("Thumbs Component", () => {
	const images = [
		"https://swiperjs.com/demos/images/nature-1.jpg",
		"https://swiperjs.com/demos/images/nature-2.jpg",
		"https://swiperjs.com/demos/images/nature-3.jpg",
	];
	const bookName = "Test Book";
	const altText = "additional";

	it("renders correctly", () => {
		render(<Thumbs images={images} bookName={bookName} />);

		// Check if images are rendered
		images.forEach((image, index) => {
			const img = screen.getByAltText(
				`${bookName} ${altText} - photo ${index + 1}`
			);

			expect(img).toHaveAttribute("src", image);
		});

		// Check the text that displays the amount of additional photos
		expect(screen.getByText(/Additional photos \(5\)/)).toBeInTheDocument();
	});

	it("displays correct number of images", () => {
		render(<Thumbs images={images} bookName={bookName} />);

		const swiperImages = screen.getAllByRole("img");
		expect(swiperImages.length).toBe(images.length * 2); // Ensure the correct number of images are displayed
	});

	it("displays the book name in the alt text for each image", () => {
		render(<Thumbs images={images} bookName={bookName} />);

		images.forEach((image, index) => {
			const img = screen.getByAltText(
				`${bookName} ${altText} - photo ${index + 1}`
			);
			expect(img).toHaveAttribute("src", image);
		});
	});

	it("displays the correct number of additional photos based on mock value", () => {
		// Ensure that the mocked value of 5 is used in the component text
		render(<Thumbs images={images} bookName={bookName} />);
		expect(screen.getByText(/Additional photos \(5\)/)).toBeInTheDocument();
	});
});
