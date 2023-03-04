import { render, fireEvent } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import Product from "../pages/product";
import { GET_PRODUCT, ProductBody } from "../pages/productBody";

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
          "Product": {
              "id": "1",
              "name": "Energy saving light bulb"
          }
      }
    }
  }
];

test("should be able to increase and decrease product quantity", async () => {
  const { getByText, getByTitle } = render(<Product />);

  const increaseQuantity = getByText("+");

  const currentQuantity = getByTitle("Current quantity");
  expect(currentQuantity).toHaveTextContent("1");

  fireEvent.click(increaseQuantity);
  expect(currentQuantity).toHaveTextContent("2");

  const decreaseQuantity = getByText("-");

  fireEvent.click(decreaseQuantity);
  expect(currentQuantity).toHaveTextContent("1");
});

test("should be able to add items to the basket", async () => {
  const { getByText, getByTitle } = render(<Product />);

  const increaseQuantity = getByText("+");

  const currentQuantity = getByTitle("Current quantity");

  fireEvent.click(increaseQuantity);
  fireEvent.click(increaseQuantity);
  fireEvent.click(increaseQuantity);

  expect(currentQuantity).toHaveTextContent("4");

  const addToBasketElement = getByText("Add to cart");
  fireEvent.click(addToBasketElement);

  const basketItems = getByTitle("Basket items");
  expect(basketItems).toHaveTextContent("4");
});

test("should render product name", async () => {
  const { findByText } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <ProductBody />
    </MockedProvider>
  );
  expect(await findByText("Loading")).toBeInTheDocument();
  const title = await findByText('Energy saving light bulb');
  expect(title).toHaveTextContent('Energy saving light bulb');
});
