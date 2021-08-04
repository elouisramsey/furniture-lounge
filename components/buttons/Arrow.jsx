import Link from 'next/link'
import { BsArrowRight } from 'react-icons/bs'

const Arrow = ({ text = 'Find out more', link }) => {
  return (
    <Link href={link}>
      <a className='py-3 flex items-center justify-center my-5 text-black border-b border-solid border-black font-Poppins'>
        <p className='mr-3'>{text}</p>
        <BsArrowRight className='text-2xl' />
      </a>
    </Link>
  )
}

export default Arrow
