// For faster app loading
import { Suspense, lazy } from "react";

// React Router DOM routes
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Styled components theme 
import { ThemeProvider as StyledThemeProvider } from "styled-components";

// MUI components
import { Container } from "@mui/material";

// Custom styles and theme
import GlobalStyle from "@styles/GlobalStyle";
import theme from "@styles/theme";

// Custom components
import Header from "@components/header";

// Pages
const MainPage = lazy(() => import("@pages/Main"));
const Admin = lazy(() => import( "@pages/Admin"));

// Pages with info for specific item
const BookPage = lazy(() => import("@pages/Book"));
const GenrePage = lazy(() => import("@pages/Genre"));
const AuthorPage = lazy(() => import("@pages/Author"));

// Pages with lists
const BooksPage = lazy(() => import("@pages/Books"));
const AuthorsPage = lazy(() => import("@pages/Authors"));
const PublishersPage = lazy(() => import("@pages/Publishers"));

// User
const UserSignInPage = lazy(() => import("@pages/User/userSignIn"));
const UserSignUpPage = lazy(() => import("@pages/User/userSignUp"));
const UserProfilePage = lazy(() => import("@pages/User/userProfile/userProfile"));


function App() {
	return (
		<Suspense>
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
							<Route path="/author/:authorId" element={<AuthorPage />} />
							<Route path="/publishers" element={<PublishersPage />} />
							<Route path="/admin" element={<Admin />} />
							<Route path="/sign-in" element={<UserSignInPage />} />
							<Route path="/sign-up" element={<UserSignUpPage />} />
							<Route path="/check-auth" element={<UserProfilePage />} />
						</Routes>
					</Container>
				</Router>
			</StyledThemeProvider>
		</Suspense>
	);
}

export default App;
