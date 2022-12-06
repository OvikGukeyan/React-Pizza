import { Header  } from './components';
import {Home, Cart} from './pages'
import { Routes, Route } from "react-router-dom";
import { useState } from 'react';



function App() {
  const [searchValue, setSearchValue] = useState('');
  
  return (
    <div className="wrapper">
      <Header searchValue={searchValue} setSearchValue={setSearchValue}/>
      <div className="content">
        <Routes>
          <Route
            path=''
            element={<Home searchValue={searchValue}/>} 
            />
          <Route
            path='cart'
            element={<Cart/>}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
