import React from 'react';
import { Header } from './components';
import Home from './pages/Home'
import { Routes, Route } from "react-router-dom";

const Cart = React.lazy(() => import('./pages/Cart'));

function App() {

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route
            path=''
            element={<Home />}
          />
          <Route
            path='cart'
            element={
              <React.Suspense fallback={<div>Loading...</div>}>
                <Cart />
              </React.Suspense>}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
