import { render, fireEvent } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { Product } from "../pages/product";
import { GET_PRODUCT } from "../pages/productBody";
import db from '../../server/db';

const mocks =  [
  {
    request: {
      query: GET_PRODUCT,
      variables: {
        id: 1
      }
    },
    result: {
      "data": {
          "Product": db.products[0]
      }
    },
  }
];

test("should be able to increase and decrease product quantity", async () => {
  const { findByText, findByTitle } = render(    
  <MockedProvider mocks={mocks} addTypename={false}>
    <Product />
  </MockedProvider>);

  const increaseQuantity = await findByText("+");

  const currentQuantity = await findByTitle("Current quantity");
  expect(currentQuantity).toHaveTextContent("1");

  fireEvent.click(increaseQuantity);
  expect(currentQuantity).toHaveTextContent("2");

  const decreaseQuantity = await findByText("-");

  fireEvent.click(decreaseQuantity);
  expect(currentQuantity).toHaveTextContent("1");
});

test("should be able to add items to the basket", async () => {
  const { findByText, findByTitle } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Product />
  </MockedProvider>);

  const increaseQuantity = await findByText("+");

  const currentQuantity = await findByTitle("Current quantity");

  fireEvent.click(increaseQuantity);
  fireEvent.click(increaseQuantity);
  fireEvent.click(increaseQuantity);

  expect(currentQuantity).toHaveTextContent("4");

  const addToBasketElement = await findByText("Add to cart");
  fireEvent.click(addToBasketElement);

  const basketItems = await findByTitle("Basket items");
  expect(basketItems).toHaveTextContent("4");
});

test("should render product name", async () => {
  const { findByText } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Product />
    </MockedProvider>
  );
  expect(await findByText("Loading")).toBeInTheDocument();
  const title = await findByText('Energy saving light bulb');
  expect(title).toHaveTextContent('Energy saving light bulb');
});
