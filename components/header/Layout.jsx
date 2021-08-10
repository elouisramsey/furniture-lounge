import Head from 'next/head'
import Link from 'next/link'

export default function Layout() {
  return (
    <div>
      <Head>
        <link
          rel='preload'
          href='/fonts/Poppins-Regular.ttf'
          as='font'
          crossOrigin=''
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
    </div>
  )
}
