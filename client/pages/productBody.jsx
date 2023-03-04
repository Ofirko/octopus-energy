import { useQuery, gql } from '@apollo/client';

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
  const { loading, error, data } = useQuery(GET_PRODUCT, {
    variables: {
      id: 1,
    }
  });

  if (loading) {
    return <div>Loading</div>;
  }
  
  return <div>
      <div>{data.Product.name}</div>
  </div>;
}

export default ProductBody;
