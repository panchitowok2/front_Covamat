import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import MostrarCasos from './MostrarCasos';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <MostrarCasos />
    </ApolloProvider>
  );
}