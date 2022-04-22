import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { setupStore } from "./services/store";
import { AppPage, LoginPage, RegisterPage, ProfilePage, ResetPasswordPage, ForgotPasswordPage, IngredientsPage, NotFoundPage } from "./pages";
import MainLayout from "./layouts/main-layout";

const store = setupStore()

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<Router>
			<Routes>
				<Route path="/" element={<MainLayout/>}>
					<Route index element={<AppPage/>}/>
					<Route path="/ingredients" element={<AppPage/>}/>
					<Route path="/login" element={<AppPage/>}/>
					<Route path="/register" element={<AppPage/>}/>
					<Route path="/*" element={<NotFoundPage/>}/>
				</Route>
			</Routes>
			</Router>
		</Provider>
	</React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
