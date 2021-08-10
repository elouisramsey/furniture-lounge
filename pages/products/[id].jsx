import Product from '../../components/Product/Product'

// apolloClient.js
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  gql
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GQLURL
})

const authLink = setContext((_, { headers }) => {
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      'x-api-key': process.env.NEXT_PUBLIC_KEY
    }
  }
})

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

const Item = ({ product }) => {
  return <Product product={product} />
}

export default Item

export async function getStaticPaths() {
  const products = await getAll()
  return {
    paths: products.items.map((product) => ({
      params: { id: product.id } // Rename to `slug`
    })),
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const product = await getByID(params.id) // Rename to `params.slug`
  return { props: { product } }
}

export async function getAll() {
  return apolloClient
    .query({
      query: gql`
        query listProducts {
          listProducts {
            items {
              id
            }
          }
        }
      `
    })
    .then((result) => result.data.listProducts)
}

export async function getByID(id) {
  return apolloClient
    .query({
      query: gql`
        query Query($getProductId: ID!) {
          getProduct(id: $getProductId) {
            id
            name
            description
            weight
            category
            image {
              key
              region
              bucket
            }
            price
          }
        }
      `,
      variables: {
        getProductId: id
      }
    })
    .then((result) => {
      return result.data.getProduct
    })
}
