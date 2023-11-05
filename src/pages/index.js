import Head from 'next/head'
import { client } from '@/lib/contentful';
import ContentfulImage from '@/components/ContentfulImage';
// import ContactForm from '@/components/ContactForm';
import Logo from '../../public/images/combinedOutlineLogo.png';
import Card from "@/components/Card";
import Intro from '@/components/Intro';
import MusicVideoSection from "@/components/MusicVideoSection";
// import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useState } from 'react';


const inter = Inter({ subsets: ['latin'] })

export default function Home({ gallery, introductionPhotos, musicVideoSection }) {
  const [introFinish, setIntroFinish] = useState(false);


  return (
    <>
      <Head>
        <title>LMW</title>
        <meta name="description" content="Las Muchachos World Wide" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Intro introPhotos={introductionPhotos} setIntroFinish={setIntroFinish}/>
      <main className={introFinish ? `${styles.main} ${styles.active}` : `${styles.main}`}>
        <div className={styles.homeContainer}>
            <MusicVideoSection musicVideosData={musicVideoSection}/>
            {gallery.map((post, i) => (
              <Card key={i} post={post} />
            ))}
        </div>
      </main>
    </>
  )
}

export const getStaticProps = async() => {
  const galleryData = await client.getEntries({ content_type: "gallery" });
  const introData = await client.getEntries({ content_type: "introductionPage" });
  const musicVideoSectionData = await client.getEntries({ content_type: "musicVideos" });
  
  return {
    props: {
      gallery: galleryData.items,
      introductionPhotos: introData.items,
      musicVideoSection: musicVideoSectionData.items,
      revalidate: 70,
    }
  }
}
