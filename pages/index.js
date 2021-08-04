import Categories from '../components/categories/Categories'
import Footer from '../components/Footer'
import Hero from '../components/header/Hero'
import Nav from '../components/navigation/Nav'
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
    <main className='h-screen overflow-x-hidden'>
      <Hero />
      <Quote />
      <Categories />
      <Newproducts products={products} />
    </main>
  )
}

export default Index
