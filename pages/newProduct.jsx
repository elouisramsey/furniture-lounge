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
  const [weight, setWeight] = useState('')
  const [category, setcategory] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    //   upload image to s3
    const uploadedImage = await Storage.put(image.name, image)

    const data = await API.graphql({
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
          weight,
          category
        }
      }
    })
    // console.log(data)
  }
  return (
    <section>
      <article className='px-10 py-5'>
        <h3 className='font-PlayFairDisplay text-xl font-medium text-black mb-4'>
          Add a New Product
        </h3>
        <form onSubmit={handleSubmit} className='flex flex-col mb-16'>
          <label
            htmlFor='name'
            className='text-lightGrey text-sm mb-2 capitalize'
          >
            Name
          </label>
          <input
            autoFocus
            className='h-12 border border-solid border-borderColor font-Poppins font-medium text-black focus:ring-transparent focus:outline-none form-input mb-3 mb-3'
            type='text'
            id='name'
            name='name'
            onChange={(e) => setName(e.target.value)}
          />
          <label
            htmlFor='price'
            className='text-lightGrey text-sm mb-2 capitalize'
          >
            price
          </label>
          <input
            className='h-12 border border-solid border-borderColor font-Poppins font-medium text-black focus:ring-transparent focus:outline-none form-input mb-3 mb-3'
            type='number'
            id='price'
            name='price'
            onChange={(e) => setPrice(e.target.value)}
          />
          <label
            htmlFor='weight'
            className='text-lightGrey text-sm mb-2 capitalize'
          >
            weight
          </label>
          <input
            className='h-12 border border-solid border-borderColor font-Poppins font-medium text-black focus:ring-transparent focus:outline-none form-input mb-3 mb-3'
            type='text'
            name='weight'
            id='weight'
            onChange={(e) => setWeight(e.target.value)}
          />
          <label
            htmlFor='category'
            className='text-lightGrey text-sm mb-2 capitalize'
          >
            category
          </label>

          <select
            onChange={(e) => setcategory(e.target.value)}
            value={category}
            required
            name='category'
            id='category'
            className='h-12 border border-solid border-borderColor font-Poppins font-medium text-softGrey form-select  focus:border-borderColor focus:ring-transparent focus:outline-none capitalize mb-3'
          >
            <option className='text-softGrey' value='sofa'>
              sofa
            </option>
            <option className='text-softGrey' value='big_guy'>
              big guy
            </option>
          </select>

          <label
            htmlFor='description'
            className='text-lightGrey text-sm mb-2 capitalize'
          >
            description
          </label>
          <textarea
            className='h-32 border border-solid border-borderColor font-Poppins font-medium text-black focus:ring-transparent focus:outline-none form-input resize-none mb-3'
            type='text'
            name='description'
            id='description'
            onChange={(e) => setDescription(e.target.value)}
          />
          <label htmlFor='image'>Image</label>
          <input
            className=''
            type='file'
            id='image'
            onChange={(e) => setImage(e.target.files[0])}
          />
          <div className=''>
            {' '}
            <button
              type='submit'
              className='flex items-center justify-center px-8 my-9 bg-black hover:bg-white border border-black border-solid font-semibold capitalize transition duration-500 ease-in-out font-Poppins text-sm font-bold tracking-wider py-2 text-white hover:text-black'
            >
              create new product
            </button>
          </div>
        </form>
      </article>
    </section>
  )
}

export default withAuthenticator(NewProduct)
