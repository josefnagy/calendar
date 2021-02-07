import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import storage from "redux-persist/lib/storage";
import reduxThunk from "redux-thunk";

import "./js/vendor/grained";

import App from "./App.jsx";
import "./sass/main.scss";
import reducers from "./reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// eslint-disable-next-line no-undef
grained("#root", {
  animate: true,
  patternWidth: 100,
  patternHeight: 100,
  grainOpacity: 0.02,
  grainDensity: 1,
  grainWidth: 1,
  grainHeight: 1,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(reduxThunk))
);

const persistor = persistStore(store);

// PersistorGate loading= se muze nastavit jakakoliv komponenta jako preloader

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
