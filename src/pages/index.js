import Head from 'next/head'
import { client } from '@/lib/contentful';
import Card from "@/components/Card";
import Intro from '@/components/Intro';
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useEffect, useState } from 'react';


const inter = Inter({ subsets: ['latin'] })

export default function Home({ gallery, introductionPhotos }) {
  // console.log(gallery);
  const [introFinish, setIntroFinish] = useState(false);


  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Las Muchachos World Wide" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Intro introPhotos={introductionPhotos} setIntroFinish={setIntroFinish}/>
      <main className={introFinish ? `${styles.main} ${styles.active}` : `${styles.main}`}>
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
  const response2 = await client.getEntries({ content_type: "introductionPage" });
  
  return {
    props: {
      gallery: response.items,
      introductionPhotos: response2.items,
      revalidate: 70,
    }
  }
}
