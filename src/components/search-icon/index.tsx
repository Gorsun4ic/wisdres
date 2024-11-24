import theme from "../../styles/theme";

const SearchIcon = ({
	size = 24,
	color = theme.colors.grey,
}: {
	size?: number;
	color?: string;
}) => {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg">
			<path
				d="M16.9268 17.04L20.4 20.4M19.28 11.44C19.28 15.7699 15.7699 19.28 11.44 19.28C7.11006 19.28 3.59998 15.7699 3.59998 11.44C3.59998 7.11009 7.11006 3.60001 11.44 3.60001C15.7699 3.60001 19.28 7.11009 19.28 11.44Z"
				stroke={color}
				strokeLinecap="round"
			/>
		</svg>
	);
};

export default SearchIcon;
