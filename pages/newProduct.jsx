import { withAuthenticator } from '@aws-amplify/ui-react'
import { API, Storage } from 'aws-amplify'
import { useState } from 'react'

import { createProduct } from '../src/graphql/mutations'
import config from '../src/aws-exports'

const NewProduct = () => {
  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [size, setSize] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    //   upload image to s3
    const uploadedImage = await Storage.put(image.name, image)

    const newProduct = await API.graphql({
      query: createProduct,
      variables: {
        input: {
          name,
          image: {
            // use the image's region and bucket (from aws-exports) as well as the key from the uploaded image
            region: config.aws_user_files_s3_bucket_region,
            bucket: config.aws_user_files_s3_bucket,
            key: uploadedImage.key
          },
          description,
          price,
          size
        }
      }
    })
  }
  return (
    <section>
      <article className='px-10'>
        <h3 className='font-PlayFairDisplay text-xl font-medium text-black my-8'>
          Add a new product
        </h3>
        <form onSubmit={handleSubmit} className='flex flex-col mb-16'>
          <h2>Create a Product</h2>
          <label htmlFor='name'>Name</label>
          <input
            className='border border-solid border-black mb-3'
            type='text'
            id='name'
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor='description'>description</label>
          <input
            className='border border-solid border-black mb-3'
            type='text'
            id='description'
            onChange={(e) => setDescription(e.target.value)}
          />
          <label htmlFor='price'>price</label>
          <input
            className='border border-solid border-black mb-3'
            type='number'
            id='price'
            onChange={(e) => setPrice(e.target.value)}
          />
          <label htmlFor='size'>size</label>
          <input
            className='border border-solid border-black mb-3'
            type='text'
            id='size'
            onChange={(e) => setSize(e.target.value)}
          />
          <label htmlFor='image'>Image</label>
          <input
            className=''
            type='file'
            id='image'
            onChange={(e) => setImage(e.target.files[0])}
          />
          <button
            type='submit'
            className='flex items-center justify-center px-8 my-4 bg-black hover:bg-white border border-black border-solid font-semibold capitalize transition duration-500 ease-in-out font-Poppins text-sm font-bold tracking-wider py-2 text-white w-1/5 hover:text-black'
          >
            create
          </button>
        </form>
      </article>
    </section>
  )
}

export default withAuthenticator(NewProduct)
