import React from "react";

import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { setupStore } from "./services/store";
import {BrowserRouter as Router} from 'react-router-dom'
import App from "./components/app/app";

const store = setupStore()

declare global {
	interface Window {
	  Cypress?: Cypress.Cypress;
	  store?: any
	}
  }

if (window.Cypress) {
	window.store = store;
  }

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<Router>
				<App/>
			</Router>
		</Provider>
	</React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
