import Link from 'next/link'
import { AmplifyS3Image } from '@aws-amplify/ui-react'
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  gql
} from '@apollo/client'

import { setContext } from '@apollo/client/link/context'
import React, { useEffect, useState } from 'react'

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

const Index = ({ products, tokenGet }) => {
  const [data, setData] = useState(products)
  const [searchValue, setSearchValue] = useState('')

  const [nextToken, setNextToken] = useState(products.nextToken)
  const [previousTokens, setPreviousTokens] = useState([products.nextToken])
  console.log(previousTokens)
  const fetchData = async () => {
    setPreviousTokens((prev) => [nextToken])
    const newData = await getAll(nextToken)

    setNextToken(newData.nextToken)

    return setData(newData)
  }

  const fetchPrevData = async () => {
    const newData = await getAll(previousTokens.slice[0])
    // setPreviousTokens(previousTokens.pop())
    return setData(newData)
  }

  const handleClick = async (event) => {
    event.preventDefault()
    fetchData()
  }
  const backHandleClick = async (event) => {
    event.preventDefault()
    fetchPrevData()
  }

  useEffect(() => {
    async function fetchMyAPI() {
      let response = await filterByName(searchValue)
      response = await response
    }
    fetchMyAPI()
  }, [searchValue])

  const handleSearch = (event) => {
    let value = event.target.value.toLowerCase()
    setSearchValue(value)
  }
  return (
    <>
      <button onClick={handleClick}>FETCH DATA</button>
      <button onClick={backHandleClick}>back</button>
      <section className='lg:px-10 my-5 lg:my-16 px-4'>
        <h2 className='text-heroHead font-PlayFairDisplay text-2xl'>
          All Products
        </h2>
        <input
          required
          type='search'
          className='h-8 border border-solid border-borderColor font-Poppins font-medium text-black focus:ring-transparent focus:outline-none form-input mt-3'
          id='search'
          name='search'
          onChange={(event) => handleSearch(event)}
        />
        <article className='lg:grid-cols-4 grid lg:gap-6 my-5 lg:my-8'>
          {data ? (
            <>
              {data.items.map((product) => (
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
              ))}
            </>
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
  const products = items
  const tokenGet = await getAll(products.nextToken)

  return { props: { products, tokenGet } }
}

export default Index

export async function getAll(token) {
  return apolloClient
    .query({
      query: gql`
        query listProducts($token: String) {
          listProducts(limit: 2, nextToken: $token) {
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
            nextToken
          }
        }
      `,
      variables: {
        token: token
      }
    })
    .then((result) => result.data.listProducts)
}

export async function filterByName(filter) {
  return apolloClient
    .query({
      query: gql`
        query listProducts($filter: String) {
          listProducts(filter: { name: { contains: $filter } }) {
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
      `,
      variables: {
        filter: filter
      }
    })
    .then((result) => result.data.listProducts)
}
