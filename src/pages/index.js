import Head from 'next/head'
import { client } from '@/lib/contentful';
import Card from "@/components/Card";
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home({ gallery }) {
  // console.log(gallery);
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Las Muchachos World Wide" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        las muchachoss
        <div className={styles.homeContainer}>
            {gallery.map((post, i) => (
              <Card key={i} post={post} />
            ))}

        </div>
      </main>
    </>
  )
}

export const getStaticProps = async() => {
  const response = await client.getEntries({ content_type: "gallery" });

  return {
    props: {
      gallery: response.items,
      revalidate: 70,
    }
  }
}
