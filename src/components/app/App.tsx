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
import AuthenticateRoute from "@components/authenticateRoute/authenticateRoute";
import NotAuthenticateRoute from "@components/notAunthenticatedRoute.tsx/notAuthenticatedRoute";
import AdminRoute from "@components/admin-route/adminRoute";

import Page404 from "@pages/404/404";

// Pages
const MainPage = lazy(() => import("@pages/Main"));
const Admin = lazy(() => import("@pages/Admin/adminPage"));

// Pages with info for specific item
const BookPage = lazy(() => import("@pages/Book"));
const GenrePage = lazy(() => import("@pages/Genre/genrePage"));
const AuthorPage = lazy(() => import("@pages/Author"));
const PublisherPage = lazy(() => import("@pages/Publisher/publisherPage"));
// Pages with lists
const BooksPage = lazy(() => import("@pages/Books"));
const AuthorsPage = lazy(() => import("@pages/Authors"));
const PublishersPage = lazy(() => import("@pages/Publishers"));

// User
const UserSignUpPage = lazy(() => import("@pages/User/userSignUp/userSignUp"));
const UserVerificationPage = lazy(
	() => import("@pages/User/userVerification/userVerification")
);
const UserSignInPage = lazy(() => import("@pages/User/userSignIn/userSignIn"));
const UserProfilePage = lazy(
	() => import("@pages/User/userProfile/userProfile")
);
const UserLogoutPage = lazy(() => import("@pages/User/userLogout/userLogout"));
const UserForgotPasswordPage = lazy(
	() => import("@pages/User/userForgotPassword/userForgotPassword")
);
const UserResetPasswordPage = lazy(
	() => import("@pages/User/userResetPassword/userResetPassword")
);

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
							<Route path="*" element={<Page404 />} />
							<Route path="/books" element={<BooksPage />} />
							<Route path="/book/:bookId" element={<BookPage />} />
							<Route path="/books/:genre" element={<GenrePage />} />
							<Route path="/authors" element={<AuthorsPage />} />
							<Route path="/author/:authorId" element={<AuthorPage />} />
							<Route path="/publishers" element={<PublishersPage />} />
							<Route path="/publisher/:publisherId" element={<PublisherPage />} />
							<Route
								element={
									<AdminRoute />
								}>
								<Route path="/admin" element={<Admin />} />
							</Route>

							{/* Only for users who are on email verification stage */}
							<Route
								path="/email-verification/:verificationToken"
								element={<UserVerificationPage />}
							/>

							{/* Only for authorized users */}
							<Route element={<AuthenticateRoute />}>
								<Route path="/logout" element={<UserLogoutPage />} />
							</Route>

							<Route element={<AuthenticateRoute />}>
								<Route path="/check-auth" element={<UserProfilePage />} />
							</Route>

							{/* Only for unauthorized users  */}

							<Route element={<NotAuthenticateRoute />}>
								<Route path="/sign-up" element={<UserSignUpPage />} />
							</Route>

							<Route element={<NotAuthenticateRoute />}>
								<Route path="/sign-in" element={<UserSignInPage />} />
							</Route>

							<Route element={<NotAuthenticateRoute />}>
								<Route
									path="/forgot-password"
									element={<UserForgotPasswordPage />}
								/>
							</Route>

							<Route element={<NotAuthenticateRoute />}>
								<Route
									path="/reset-password/:token"
									element={<UserResetPasswordPage />}
								/>
							</Route>
						</Routes>
					</Container>
				</Router>
			</StyledThemeProvider>
		</Suspense>
	);
}

export default App;
