import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { Container } from "@mui/material";
import GlobalStyle from "@styles/GlobalStyle";
import theme from "@styles/theme";
import Header from "@components/header";
// Pages
import MainPage from "@pages/Main";
import BooksPage from "@pages/Books";
import BookPage from "@pages/Book";
import GenrePage from "@pages/Genre";
import AuthorsPage from "@pages/Authors";
import PublishersPage from "@pages/Publishers";
import Admin from "@pages/Admin";

function App() {
	return (
		<StyledThemeProvider theme={theme}>
			<GlobalStyle />
			<Router>
				<Container
					maxWidth="lg"
					sx={{
						"&.MuiContainer-maxWidthLg": {
							maxWidth: "1600px",
						},
					}}>
					<Header />
					<Routes>
						<Route path="/" element={<MainPage />} />
						<Route path="/books" element={<BooksPage />} />
						<Route path="/book/:bookId" element={<BookPage />} />
						<Route path="/books/:genre" element={<GenrePage />} />
						<Route path="/authors" element={<AuthorsPage />} />
						<Route path="/publishers" element={<PublishersPage />} />
						<Route path="/admin" element={<Admin />} />
					</Routes>
				</Container>
			</Router>
		</StyledThemeProvider>
	);
}

export default App;
