import { ApolloProvider } from '@apollo/client';
import client from "../apollo-client";
import ProductBody from './productBody';


export default function Product() {

  return <div>
    <ApolloProvider client={client}>
      <ProductBody />
    </ApolloProvider>
  </div>;
}
