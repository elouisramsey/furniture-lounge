import Categories from '../components/categories/Categories'
import Hero from '../components/header/Hero'
import Newproducts from '../components/NewProducts'
import Quote from '../components/Quote'

import { withSSRContext } from 'aws-amplify'
import { listProducts } from '../src/graphql/queries'

export async function getServerSideProps() {
  const SSR = withSSRContext()
  const { data } = await SSR.API.graphql({ query: listProducts })
  return {
    props: {
      products: data.listProducts.items
    }
  }
}

const Index = ({ products }) => {
  return (
    <main className='overflow-x-hidden'>
      <Hero />
      <Quote />
      <Categories />
      <Newproducts products={products} />
    </main>
  )
}

export default Index
