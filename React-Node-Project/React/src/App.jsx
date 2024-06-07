import React from 'react';
import './scss/style.scss';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import { createStore } from 'redux';
import rootReducer from './redux';
import { Provider } from 'react-redux';

const store = createStore(rootReducer);

const App = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};

export default App;
