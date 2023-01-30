import { useContext } from 'react';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import ModContext from './store/modalShow-context';
import CartProvider from './store/CartProvider';

function App() {
  const cartCtx = useContext(ModContext);

  return (
    <CartProvider>
      {cartCtx.cartIsShown && <Cart />}
      <Header />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
};

export default App;
