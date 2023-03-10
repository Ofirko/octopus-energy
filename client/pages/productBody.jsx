import { useQuery, gql } from '@apollo/client';
import { useContext, useState } from 'react';
import Cart from './cart';

export const GET_PRODUCT = gql`
query Products($id: ID!) {
  Product(id: $id) {
    name
    power
    description
    price
    quantity
    brand
    weight
    height
    width
    length
    model_code
    colour
    img_url
  }
}
`;

export function ProductBody() {
  const { setCart } = useContext(Cart)
  const [qty, setQty] = useState(1);

  const { loading, error, data } = useQuery(GET_PRODUCT, {
    variables: {
      id: 1,
    }
  });

  if (loading) {
    return <div>Loading</div>;
  }
  
  return <div>
  <div className="main_Wrapper">
          <img 
            src={data.Product.img_url} 
            alt={data.Product.name}
            className="product_Image"/>
        <h1>{data.Product.name}</h1>      
        <div>{data.Product.power} // Packet of {data.Product.quantity}</div>
        <div className="calculation_Wrapper" >
          <div>£ {data.Product.price / 100}</div> 
          <div className="quantity_Wrapper">
            <div className="quantity_Headline">Qty</div>
            <button className="button" disabled={qty < 2} onClick={() => setQty((oldQty) => oldQty - 1)}> - </button>
            <div title="Current quantity"> {qty} </div> 
            <button className="button"  onClick={() => setQty((oldQty) => oldQty + 1)}> + </button>
          </div>
        </div>
        <button className="button button_Cart" 
        onClick={() => setCart((oldCart) => 
          ([...oldCart, { id: data.Product.id, name: data.Product.name, quantity: qty}]))}>Add to cart</button>
      </div>

      <div className="description_Wrapper">
        <h2> Description </h2>
        <div>{data.Product.description}</div>
      </div>

      <div className="spec_Wrapper" >
        <h2> Specifications </h2>
        <table>
          <tbody>
            <tr>
              <th>Brand</th>
              <td>{data.Product.brand}</td>
            </tr>
            <tr>
              <th>Item weight(g)</th>
              <td>{data.Product.weight}</td>
            </tr>
            <tr>
              <th>Dimensions(cm)</th>
              <td>{data.Product.height} X {data.Product.width} X {data.Product.length}</td>
            </tr>
            <tr>
              <th>Item Model number</th>
              <td>{data.Product.model_code}</td>
            </tr>
            <tr>
              <th>Colour</th>
              <td>{data.Product.colour}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>;
}

export default ProductBody;
