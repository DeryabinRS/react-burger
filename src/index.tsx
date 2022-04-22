import React from "react";

import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { setupStore } from "./services/store";

import App from "./components/app/app";

const store = setupStore()

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App/>
		</Provider>
	</React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
