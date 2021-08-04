import Link from 'next/link'

const Btn = ({
  link,
  color = 'black',
  border = 'black',
  text = 'buy now',
  bg = 'transparent',
  bgHover = 'black',
  bw = 'border',
  w = ''
}) => {
  return (
    <Link href={link}>
      <a
        className={`text-sm tracking-wider bg-${bg} hover:bg-${bgHover} text-${color} font-semibold hover:text-white py-3 px-4 ${bw} border-${border} hover:border-transparent capitalize h-full transition duration-500 ease-in-out font-Poppins w-${w} flex items-center justify-center`}
      >
        {text}
      </a>
    </Link>
  )
}

export default Btn
