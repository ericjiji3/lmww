import Head from 'next/head'
import { client } from '@/lib/contentful';
import ContentfulImage from '@/components/ContentfulImage';
import ContactForm from '@/components/ContactForm';
import Logo from '../../public/images/combinedOutlineLogo.png';
import Give1 from '../../public/images/give1.png';
import Give2 from '../../public/images/give2.png';
import Give3 from '../../public/images/give3.png';
import Give4 from '../../public/images/give4.png';
// import Card from "@/components/Card";
// import Intro from '@/components/Intro';
import CountdownTimer from '@/components/CountdownTimer';
// import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useState } from 'react';


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
      {/* <Intro introPhotos={introductionPhotos} setIntroFinish={setIntroFinish}/> */}
      <main className={introFinish ? `${styles.main} ${styles.active}` : `${styles.main}`}>
        <h1>ERROR...CONTENT UNDER CONSTRUCTION</h1>
        <CountdownTimer/>
        <div className={styles.logo}>
          <ContentfulImage
              src={Logo}
              width={500}
              className={`${styles.photo}`}
              quality='100'
              alt="oops"
              priority
          />
        </div>
        <div className={styles.givePhotos}>
          <ContentfulImage
              src={Give1}
              width={250}
              className={`${styles.photo}`}
              quality='100'
              alt="oops"
              priority
          />
          <ContentfulImage
              src={Give2}
              width={250}
              className={`${styles.photo}`}
              quality='100'
              alt="oops"
              priority
          />
          <ContentfulImage
              src={Give3}
              width={250}
              className={`${styles.photo}`}
              quality='100'
              alt="oops"
              priority
          />
          <ContentfulImage
              src={Give4}
              width={250}
              className={`${styles.photo}`}
              quality='100'
              alt="oops"
              priority
          />
        </div>
        <ContactForm/>
        {/* <div className={styles.homeContainer}>
            {gallery.map((post, i) => (
              <Card key={i} post={post} />
            ))}
        </div> */}
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
