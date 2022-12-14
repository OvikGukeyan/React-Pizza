import { Header } from './components';
import { Home, Cart } from './pages'
import { Routes, Route } from "react-router-dom";
import { useState, createContext } from 'react';

export const searchContext = createContext('')


function App() {
  const [searchValue, setSearchValue] = useState('');


  return (
    <div className="wrapper">
      <searchContext.Provider value={{searchValue, setSearchValue}}>
        <Header />
        <div className="content">
          <Routes>
            <Route
              path=''
              element={<Home />}
            />
            <Route
              path='cart'
              element={<Cart />}
            />
          </Routes>
        </div>
      </searchContext.Provider>
    </div>
  );
}

export default App;
