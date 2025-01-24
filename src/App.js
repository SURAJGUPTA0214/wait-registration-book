
// src/App.js
import React from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import Sidebar from './components/sidebar';
import PagesLinks from './pages/pagesLinks';
import { PersistGate } from 'redux-persist/integration/react';

function App() {
 
  return (
    <div className="App">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <div className="layout">
              <Sidebar />
              <div className="content">
              <PagesLinks />
              </div>
            </div>
          </Router>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;

