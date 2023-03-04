import { ApolloProvider } from '@apollo/client';
import client from "../apollo-client";
import ProductBody from './productBody';
import Cart from "./cart";
import { useState } from "react";

export function Product() {
  const [cart, setCart] = useState([]);
  const sum = cart.reduce((sum, currentItem) => sum + currentItem.quantity, 0);

  return <div>
    <Cart.Provider value={{cart, setCart}} >
      <header>
        <figure>
          <img
            src="/octopus-logo.svg"
            alt="Octopus Energy Logo"
          />
        </figure>
        <button>
          <img
            src="/basket.svg"
            alt="Basket"
            />
        </button>
        <div title="Basket items">{sum}</div>
      </header>
      <ProductBody />
    </Cart.Provider>
    <footer>
    Octopus Energy Ltd is a company registered in England and Wales.
Registered number: 09263424. Registered office: 33 Holborn, London, ECIN 2HT. Trading office: 20-24 Broadwick Street, London,
WIF 8HT
    </footer>
  </div>;
}

const wrappedProduct = () => (
  <ApolloProvider client={client}>
    <Product />
  </ApolloProvider>
);

export default wrappedProduct;