import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { Container } from "@mui/material";
import GlobalStyle from "@styles/GlobalStyle";
import theme from "@styles/theme";
import BookPage from "@pages/Book";
import Hero from "@features/hero";

function App() {
	return (
		<>
			<GlobalStyle />
			<StyledThemeProvider theme={theme}>
				<Container
					maxWidth="lg"
					sx={{
						"&.MuiContainer-maxWidthLg": {
							maxWidth: "1248px",
						},
					}}>
					<Router>
						<Routes>
							<Route path="/" element={<Hero />} />
							<Route path="/book" element={<BookPage />} />
						</Routes>
					</Router>
				</Container>
			</StyledThemeProvider>
		</>
	);
}

export default App;
