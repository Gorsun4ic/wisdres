import { styled } from "@mui/material/styles";
// import Button from "@mui/material/Button";
import Button from "@components/button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const VisuallyHiddenInput = styled("input")({
	clip: "rect(0 0 0 0)",
	clipPath: "inset(50%)",
	height: 1,
	overflow: "hidden",
	position: "absolute",
	bottom: 0,
	left: 0,
	whiteSpace: "nowrap",
	width: 1,
});

export default function InputFileUpload({onAttachment}) {
	return (
		<Button
			component="label"
			role={undefined}
			variant="contained"
			tabIndex={-1}
			startIcon={<CloudUploadIcon />}>
			Upload files
			<VisuallyHiddenInput
				type="file"
				onChange={(event) => onAttachment(event.target.files[0])}
				multiple
			/>
		</Button>
	);
}
