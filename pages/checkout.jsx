import Link from 'next/link'
import axios from 'axios'
import { AmplifyS3Image } from '@aws-amplify/ui-react'
import { useCartContext } from '../components/context/CartProvider'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Router from 'next/router'
import { usePaystackPayment } from 'react-paystack'
import { useAuthContext } from '../components/context/AuthProvider'
import Login from './login'
import { useState } from 'react'
import Btn from '../components/buttons/Btn'

const Checkout = () => {
  const { cart, total, emptyCart, numberOfItemsInCart } = useCartContext()
  const { user, userprofile } = useAuthContext()
  const [delivery, setDelivery] = useState(0)

  const totalCost = total + parseInt(delivery, 10)

  // paystack config
  const config = {
    reference: new Date().getTime().toString(),
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK,
    email: `${userprofile?.attributes.email}`,
    amount: totalCost * 100,
    metadata: {
      // cart_id: 398,
      custom_fields: []
    }
  }

  const schema = yup.object().shape({
    email: yup.string().email().required(),
    name: yup.string().required(),
    telephone: yup.number().required(),
    address: yup.string().required(),
    address2: yup.string(),
    notes: yup.string(),
    credit: yup.string().required(),
    card: yup
      .string()
      .required()
      .matches(/^[0-9]+$/, 'Must be only digits')
      .min(12, 'Must be exactly 12 digits')
      .max(12, 'Must be exactly 12 digits'),
    CVV: yup
      .string()
      .required()
      .matches(/^[0-9]+$/, 'Must be only digits')
      .min(3, 'Must be exactly 3 digits')
      .max(3, 'Must be exactly 3 digits'),
    month: yup
      .string()
      .required()
      .matches(/^[0-9]+$/, 'Must be only digits')
      .min(2, 'Must be exactly 2 digits')
      .max(2, 'Must be exactly 2 digits'),
    year: yup
      .string()
      .required()
      .matches(/^[0-9]+$/, 'Must be only digits')
      .min(2, 'Must be exactly 2 digits')
      .max(2, 'Must be exactly 2 digits')
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({ resolver: yupResolver(schema) })

  // handle form submissions
  const onSubmitHandler = (data) => {
    console.log(data)
    config.metadata.custom_fields = {
      display_name: data.name
    }
    data.total = totalCost
    data.items = cart
    data.deliveryMethod = delivery

    axios({
      method: 'POST',
      url: 'https://formspree.io/f/mayapdkq',
      data: data
    }).then(() => {
      initializePayment(onSuccess, onClose)
    })
  }
  const onSuccess = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.

    Router.push({
      pathname: '/orderConfirmation',
      query: { reference: reference.reference, cart: cart, total: totalCost }
    })
    emptyCart()
    reset()
  }

  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    alert('Dont forget to checkout when you are done.')
  }

  const initializePayment = usePaystackPayment(config)

  return (
    <>
      {user && numberOfItemsInCart !== 0 ? (
        <section className='px-10 py-8 flex'>
          <form
            onSubmit={handleSubmit(onSubmitHandler)}
            className='flex flex-col lg:w-1/2'
          >
            <section className='flex items-center'>
              <Link href='/cart'>
                <a className='underline font-Poppins capitalize text-sm'>
                  cart
                </a>
              </Link>
              <p className=' font-Poppins capitalize text-sm mx-2 text-black'>
                {'>'}
              </p>
              <Link href='/checkout'>
                <a className='font-semibold font-Poppins capitalize text-sm'>
                  checkout
                </a>
              </Link>
            </section>
            <p className='text-base font-semibold font-Poppins my-5 text-black capitalize'>
              customer
            </p>
            <label htmlFor='name' className='text-lightGrey text-sm mb-2'>
              Full name*
            </label>
            <input
              required
              {...register('name')}
              type='text'
              name='name'
              id='name'
              className='h-12 border border-solid border-borderColor font-Poppins font-medium text-black focus:ring-transparent focus:outline-none form-input'
            />
            <p className='text-xs'>{errors.name?.message}</p>
            <section className='grid grid-cols-2 gap-3 my-4'>
              <div className='flex flex-col'>
                {' '}
                <label
                  htmlFor='telephone'
                  className='text-lightGrey text-sm mb-2'
                >
                  Telephone*
                </label>
                <input
                  required
                  {...register('telephone')}
                  type='tel'
                  name='telephone'
                  id='telephone'
                  className='h-12 border border-solid border-borderColor font-Poppins font-medium text-black focus:ring-transparent form-input'
                />
                <p className='text-xs'>{errors.telephone?.message}</p>
              </div>
              <div className='flex flex-col'>
                {' '}
                <label htmlFor='email' className='text-lightGrey text-sm mb-2'>
                  Email*
                </label>
                <input
                  required
                  {...register('email')}
                  type='email'
                  name='email'
                  id='email'
                  className='h-12 border border-solid border-borderColor font-Poppins font-medium text-black focus:ring-transparent focus:outline-none form-input'
                />{' '}
                <p className='text-xs'>{errors.email?.message}</p>
              </div>
            </section>
            <p className='text-base font-semibold font-Poppins my-5 text-black capitalize'>
              shipping address
            </p>
            <label
              htmlFor='shippingName'
              className='text-lightGrey text-sm mb-2'
            >
              Full name*
            </label>
            <input
              required
              {...register('shippingName')}
              type='text'
              name='shippingName'
              id='shippingName'
              className='form-input h-12 border border-solid border-borderColor font-Poppins font-medium text-black focus:outline-none'
            />
            <p className='text-xs'>{errors.shippingName?.message}</p>
            <section className='grid grid-cols-2 gap-3 my-4'>
              <div className='flex flex-col'>
                {' '}
                <label
                  htmlFor='address'
                  className='text-lightGrey text-sm mb-2'
                >
                  Address Line 1*
                </label>
                <input
                  required
                  {...register('address')}
                  type='text'
                  name='address'
                  id='address'
                  className='h-12 border border-solid border-borderColor font-Poppins font-medium text-black form-input'
                />
                <p className='text-xs'>{errors.address?.message}</p>
              </div>
              <div className='flex flex-col'>
                {' '}
                <label
                  htmlFor='address2'
                  className='text-lightGrey text-sm mb-2'
                >
                  Address Line 2 (optional)
                </label>
                <input
                  {...register('address2')}
                  type='text'
                  name='address2'
                  id='address2'
                  className='h-12 border border-solid border-borderColor font-Poppins font-medium text-black form-input'
                />
                <p className='text-xs'>{errors.address2?.message}</p>
              </div>
            </section>
            <label htmlFor='address' className='text-lightGrey text-sm mb-2'>
              Shipping method*
            </label>
            <select
              onChange={(e) => setDelivery(e.target.value)}
              // value={delivery}
              required
              // {...register('delivery')}
              name='delivery'
              id='delivery'
              className='h-12 border border-solid border-borderColor font-Poppins font-medium text-softGrey form-select  focus:border-borderColor focus:ring-transparent focus:outline-none'
            >
              <option className='text-softGrey' value='0'>
                Select a delivery option
              </option>
              <option
                className='text-softGrey'
                defaultValue='7000'
                value='7000'
              >
                Internal delivery - 7000 {'\u20A6'}
              </option>
              <option className='text-softGrey' value='13000'>
                Long distance -13000 {'\u20A6'}
              </option>
            </select>
            <p className='text-xs'>{errors.shippingMethod?.message}</p>
            <section className='my-4 flex'>
              <label className='flex items-center'>
                <input type='checkbox' className='form-checkbox color-black' />
                <span className='ml-2 font-Poppins text-black text-sm w-4/5 font-medium'>
                  Receive our news, restocking, good plans and news in your
                  mailbox! Rest assured, you will not be flooded, we only send
                  one newsletter per month approximately 🙂
                </span>
              </label>
            </section>
            <section className='my-4 flex flex-col'>
              <label htmlFor='notes' className='text-lightGrey text-sm mb-2'>
                Order notes (optional)
              </label>
              <textarea
                {...register('notes')}
                name='notes'
                spellCheck='false'
                id='notes'
                className='h-28 border border-solid border-borderColor font-Poppins font-medium text-black focus:ring-transparent focus:outline-none form-textarea resize-none'
              />
              <p className='text-xs'>{errors.notes?.message}</p>
            </section>

            <section className='my-12'>
              <p className='text-base font-semibold font-Poppins mb-5 text-black capitalize'>
                payment detail
              </p>
              <section className='border border-solid border-borderColor px-3 py-4'>
                <section className='flex items-center mb-6'>
                  <input
                    required
                    {...register('credit')}
                    type='radio'
                    name='credit'
                    id='credit'
                    className='mr-5 form-radio text-black'
                  />
                  <p className='text-xs'>{errors.credit?.message}</p>
                  <p className='text-base font-bold font-Poppins text-black capitalize font-medium'>
                    Credit/Debit card
                  </p>
                </section>
                <section className='px-9 flex flex-col'>
                  <section className='flex'>
                    <section className='flex flex-col w-4/5 mr-4'>
                      <label
                        htmlFor='cardNo'
                        className='text-lightGrey text-sm mb-2'
                      >
                        Card Number*
                      </label>
                      <input
                        required
                        {...register('card')}
                        type='number'
                        name='card'
                        id='card'
                        className='form-input h-12 border border-solid border-borderColor font-Poppins font-medium text-black focus:outline-none'
                      />
                      <p className='text-xs'>{errors.card?.message}</p>
                    </section>
                    <section className='flex flex-col w-1/5'>
                      <label
                        htmlFor='CVV'
                        className='text-lightGrey text-sm mb-2'
                      >
                        CVV*
                      </label>
                      <input
                        required
                        {...register('CVV')}
                        type='number'
                        name='CVV'
                        id='CVV'
                        className='form-input h-12 border border-solid border-borderColor font-Poppins font-medium text-black focus:outline-none'
                      />
                      <p className='text-xs'>{errors.CVV?.message}</p>
                    </section>
                  </section>
                  <section className='flex mt-5'>
                    <section className='flex flex-col w-2/6 mr-4'>
                      <label
                        htmlFor='month'
                        className='text-lightGrey text-sm mb-2'
                      >
                        Expiry Month*
                      </label>
                      <input
                        required
                        {...register('month')}
                        type='number'
                        name='month'
                        id='month'
                        className='form-input h-12 border border-solid border-borderColor font-Poppins font-medium text-black focus:outline-none'
                      />
                      <p className='text-xs'>{errors.month?.message}</p>
                    </section>
                    <section className='flex flex-col w-2/6 mr-4'>
                      <label
                        htmlFor='year'
                        className='text-lightGrey text-sm mb-2'
                      >
                        Expiry Year*
                      </label>
                      <input
                        required
                        {...register('year')}
                        type='number'
                        name='year'
                        id='year'
                        className='form-input h-12 border border-solid border-borderColor font-Poppins font-medium text-black focus:outline-none'
                      />
                      <p className='text-xs'>{errors.year?.message}</p>
                    </section>
                  </section>
                </section>
              </section>
            </section>
            <button
              type='submit'
              className='text-sm font-semibold tracking-wider bg-black text-white py-3 border border-solid border-black capitalize flex items-center justify-center my-8 h-full transition duration-500 ease-in-out hover:text-black hover:bg-white'
            >
              make payment
            </button>
          </form>
          <section className=' pl-16 w-1/2'>
            <section className='bg-orderSummary p-8 ml-16'>
              <p className='text-base font-semibold font-Poppins mb-5 text-black capitalize'>
                your order
              </p>
              <section className='border-t border-b border-solid py-5'>
                {cart?.map((product) => (
                  <section className='flex justify-between' key={product.id}>
                    <section className='flex items-center mb-5'>
                      <section className='flex justify-center w-36 items-center h-16 overflow-hidden bg-cateBg'>
                        <AmplifyS3Image
                          imgKey={product.image.key}
                          className='max-w-full flex w-full'
                          alt={product.name}
                        />
                      </section>
                      <section className='flex flex-col ml-3'>
                        <p className='text-sm text-black font-semibold capitalize'>
                          {product.name}
                        </p>
                        <p className='text-sm text-lightGrey'>
                          Quantity: {product.quantity}
                        </p>{' '}
                        <p className='text-sm text-lightGrey capitalize'>
                          weight: {product.weight}kg
                        </p>
                      </section>
                    </section>
                    <p className='text-semibold text-black'>
                      {'\u20A6'}
                      {(product.price * product.quantity).toLocaleString()}
                    </p>
                  </section>
                ))}
              </section>
              <section className='border-b border-solid border-black py-5'>
                <section className='flex justify-between items-center '>
                  <p className='font-thin text-black capitalize'>subtotal</p>
                  <p className='font-medium bold text-black'>
                    {'\u20A6'}
                    {total.toLocaleString()}
                  </p>
                </section>
                <section className='flex justify-between items-center '>
                  <p className='font-thin text-black capitalize'>tax</p>
                  <p className='font-medium bold text-black'>{'\u20A6'}0</p>
                </section>
                <section className='flex justify-between items-center '>
                  <p className='font-thin text-black capitalize'>shipping</p>
                  <p className='font-medium bold text-black'>
                    {'\u20A6'}
                    {delivery}
                  </p>
                </section>
                <section className='flex justify-between items-center '>
                  <p className='font-thin text-black capitalize'>discount</p>
                  <p className='font-medium bold text-black'>
                    No discount applied
                  </p>
                </section>
              </section>
              <section className='flex justify-between items-center py-5'>
                <p className='text-black font-semibold capitalize text-lg'>
                  total amount
                </p>
                <p className='text-black font-semibold text-lg'>
                  {'\u20A6'} {totalCost.toLocaleString()}
                </p>
              </section>
            </section>
          </section>
        </section>
      ) : numberOfItemsInCart === 0 ? (
        <section className='h-screen flex flex-col items-center justify-center'>
          <h3 className='font-semibold font-Poppins text-black text-sm flex items-center justify-center mb-4'>
            You dont have anything in cart
          </h3>
          <section>
            <Btn link='/products' text='continue shopping' />
          </section>
        </section>
      ) : (
        <Login />
      )}
    </>
  )
}

export default Checkout
