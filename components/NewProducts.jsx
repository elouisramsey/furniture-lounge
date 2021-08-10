import Link from 'next/link'
import Arrow from './buttons/Arrow'
import { AmplifyS3Image } from '@aws-amplify/ui-react'

const Newproducts = ({ products }) => {
  return (
    <section className='pb-6 lg:px-10'>
      <article className='text-center flex flex-col lg:w-2/5 mx-auto items-center mb-6'>
        <p className='text-softGrey '>Introducing Our Latest Products</p>
        <p className='font-medium text-2xl mt-6'>
          Limited reservations on upcoming products and restocks
        </p>

        <Arrow link='/products' text='See more products' />
      </article>
      <article className='lg:grid-cols-4 grid gap-6 my-16'>
        {products.length >= 1 ? (
          products.slice(0, 4).map((product) => (
            <Link href={`products/${product.id}`} key={product.id}>
              <a className='flex flex-col'>
                <article className='flex justify-center items-center h-32 bg-cateBg'>
                  <AmplifyS3Image
                    imgKey={product.image.key}
                    className='max-w-full flex '
                  />
                </article>
                <article className='mx-4 lg:mx-0 mb-4 lg:mb-0 flex flex-col border-b border-solid border-black'>
                  <h2 className='my-3 font-medium text-black font-Poppins text-base capitalize'>
                    {product.name}
                  </h2>
                  <p className='text-sm text-softGrey font-Poppins productDescription'>
                    {product.description}
                  </p>
                  <p className='text-black my-3'>
                    {'\u20A6'}
                    {product.price.toLocaleString()}
                  </p>
                </article>
              </a>
            </Link>
          ))
        ) : (
          <h2 className='my-3 font-medium text-black font-Poppins text-base'>
            There are currently no products
          </h2>
        )}
      </article>
    </section>
  )
}

export default Newproducts
