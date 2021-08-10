import Link from 'next/link'
import { AmplifyS3Image } from '@aws-amplify/ui-react'
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  gql
} from '@apollo/client'

import { setContext } from '@apollo/client/link/context'
import React from 'react'

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

const Index = ({ products }) => {
  return (
    <>
      <section className='px-10 my-16'>
        <h2 className='text-heroHead font-PlayFairDisplay text-2xl'>
          All Products
        </h2>
        <article className='grid-cols-4 grid gap-6 my-8'>
          {products ? (
            products.map((product) => (
              <React.Fragment key={product.id}>
                <Link href={`products/${product.id}`}>
                  <a className='flex flex-col'>
                    <article className='flex justify-center items-center h-32 bg-cateBg'>
                      <AmplifyS3Image
                        imgKey={product.image.key}
                        className='max-w-full flex '
                        alt={product.name}
                      />
                    </article>
                    <article className='flex flex-col text-center py-4'>
                      <h2 className='font-semibold text-black font-Poppins text-base capitalize'>
                        {product.name}
                      </h2>
                      <p className='text-gray-700 mb-4 font-Poppins text-base'>
                        {'\u20A6'}
                        {product.price.toLocaleString()}
                      </p>
                    </article>
                  </a>
                </Link>
              </React.Fragment>
            ))
          ) : (
            <p className='text-gray-700 mb-4 font-Poppins text-base'>
              Products are loading...
            </p>
          )}
        </article>
      </section>
    </>
  )
}

export async function getStaticProps() {
  const items = await getAll()
  const products = items.items
  return { props: { products } }
}

export default Index

export async function getAll() {
  return apolloClient
    .query({
      query: gql`
        query listProducts {
          listProducts {
            items {
              id
              name
              image {
                bucket
                region
                key
              }
              price
            }
          }
        }
      `
    })
    .then((result) => result.data.listProducts)
}
