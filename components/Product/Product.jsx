import { AmplifyS3Image } from '@aws-amplify/ui-react'
import { useState } from 'react'
import { BsPlus, BsStar } from 'react-icons/bs'
import Quantity from '../buttons/Quantity'
import { useCartContext } from '../context/CartProvider'

const Product = ({ product }) => {
  const [numberOfitems, updateNumberOfItems] = useState(1)
  const { image, name, description, price } = product
  const { addToCart } = useCartContext()

  function addProductToCart(product) {
    product['quantity'] = numberOfitems
    addToCart(product)
  }

  function increment() {
    updateNumberOfItems(numberOfitems + 1)
  }

  function decrement() {
    if (numberOfitems === 1) return
    updateNumberOfItems(numberOfitems - 1)
  }

  return (
    <section className='lg:px-10 lg:my-5 flex'>
      <section className='w-full flex flex-col lg:flex-row'>
        <section className='bg-light flex items-center justify-center h-120 hover:bg-light-200 w-full'>
          <section className='py-16 flex items-center justify-center'>
            <section className='flex justify-center items-center h-64 productDetails'>
              <AmplifyS3Image
                imgKey={image.key}
                className='max-w-full flex '
                alt={name}
              />
            </section>
          </section>
        </section>
        <section className='flex flex-col py-6 px-4 lg:pl-16 w-full'>
          <section className='flex items-center'>
            <section className='flex items-center w-1/5'>
              <BsStar className='font-semibold text-black text-base mr-1 fill-current text-black ' />{' '}
              <BsStar className='font-semibold text-black text-base mr-1 fill-current text-black ' />{' '}
              <BsStar className='font-semibold text-black text-base mr-1 fill-current text-black ' />
            </section>
            <p className='text-base text-black font-semibold font-Poppins ml-6'>
              3/5
            </p>
          </section>
          <section>
            <h2 className='font-PlayFairDisplay text-black capitalize my-2 text-3xl lg:text-4xl'>
              {name}
            </h2>
            <p className='text-black font-Poppins text-base pb-4 my-6 text-justify lg:text-left'>
              {description}
            </p>
            <Quantity add={increment} sub={decrement} qty={numberOfitems} />

            <section className='py-12 lg:py-6'>
              <button
                onClick={() => addProductToCart(product)}
                className='flex items-center h-14 bg-black text-white border border-black border-solid px-6 w-full flex-grow text hover:text-black hover:bg-white transition duration-100 ease-in-out font-Poppins'
              >
                <span className='flex-grow mr-4 text-center'>Add to cart</span>
                <span className='border-l border-white pl-4'>
                  {'\u20A6'} {price.toLocaleString()}
                </span>
              </button>
            </section>
            <section>
              <details className='cursor-pointer border-b border-black border-solid text-base mb-4 transition duration-100 ease-in-out'>
                <summary className='flex items-center justify-between text-black font-Poppins focus:outline-none font-semibold pb-4 transition duration-100 ease-in-out'>
                  Shipping and returns{' '}
                  <BsPlus className='font-semibold text-2xl' />
                </summary>
                <p className='pb-4 text-sm text-softGrey font-Poppins'>
                  Arrives in 5 to 7 days, returns accepted within 30 days. For
                  more information, click here. Nationwide Delivery.
                </p>
              </details>
              <details className='cursor-pointer border-b border-black border-solid text-base mb-4 transition duration-100 ease-in-out'>
                <summary className='flex items-center justify-between text-black font-Poppins focus:outline-none font-semibold pb-4 transition duration-100 ease-in-out'>
                  Additions
                  <BsPlus className='font-semibold text-2xl' />
                </summary>
                <p className='pb-4 text-sm text-softGrey font-Poppins'>
                  We can be contacted to add more features.
                </p>
              </details>
            </section>
          </section>
        </section>
      </section>
    </section>
  )
}

export default Product
