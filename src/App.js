import React from 'react';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { setPizzas } from './redux/actions/pizzas';
import { Header } from './components';
import { Home, Cart } from './pages';

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    axios.get('http://localhost:3001/pizzas?_order=desc&_sort=price').then(({ data }) => {
      dispatch(setPizzas(data));
    });
  });

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;