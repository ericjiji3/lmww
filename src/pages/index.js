import Head from 'next/head'
import { client } from '@/lib/contentful';
import Header from "@/components/Header";
import Intro from '@/components/Intro';
import VerticalSection from "@/components/VerticalSection";
import VideoSection from "@/components/VideoSection";
import PhotoSection from "@/components/PhotoSection";
import AboutSection from "@/components/About";
import GearSection from "@/components/GearSection";
import FabricSection from '@/components/FabricSection';
import Contact from '@/components/Contact';
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useState, useEffect } from 'react';


const inter = Inter({ subsets: ['latin'] })

export default function Home({ introductionPhotos, videoSection, gearSection }) {
  const [introFinish, setIntroFinish] = useState(false);
  const [width, setWidth] = useState();
  console.log({videoSection});

  useEffect(()=>{
    setWidth(window.innerWidth);
  }, [])

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
            <Header/>
            {
              width > 750 ? 
              <div className={`genContainer ${styles.grid}`}>
              <div className={styles.column1}>
                <div className={`${styles.compContainer} ${styles.musicVideos}`} id="musicVideos">
                  <h1 className={styles.compHeader}>VIDEOS</h1>
                  <VideoSection videosData={videoSection[1]} id="musicVideos"/>
                </div>
                <div className={`${styles.compContainer} ${styles.photography}`} id="photography">
                  <h1 className={styles.compHeader}>PHOTOGRAPHY</h1>
                  <PhotoSection photosData={videoSection[0]}/>
                </div>
                <div className={`${styles.compContainer} ${styles.musicVideos} ${styles.gears}`} id="gears">
                  <h1 className={styles.compHeader}>GEAR RENTALS</h1>
                  <GearSection gearsData={gearSection[0]}/>
                </div>
                <div className={`${styles.compContainer} ${styles.contact}`} id="contact">
                  <h1 className={styles.compHeader}>CONTACT</h1>
                  <Contact/>
                </div>
              </div>
              <div className={styles.column2}>
                <div className={`${styles.compContainer} ${styles.verticalVideos}` } id="verticalVideos">
                  <h1 className={styles.compHeader}>VERTICAL VIDEOS</h1>
                  <VerticalSection videosData={videoSection[4]}/>
                </div>
                <div className={`${styles.compContainer} ${styles.about}` } id="about">
                  <h1 className={styles.compHeader}>ABOUT</h1>
                  <AboutSection aboutData={videoSection[3]}/>
                </div>
                <div className={`${styles.compContainer} ${styles.about}` } id="fabrics">
                  <h1 className={styles.compHeader}>FABRICS</h1>
                  <FabricSection photosData={videoSection[2]}/>
                </div>
              </div>
              
              
            </div>
            :
            <div className={`genContainer ${styles.grid}`}>
              <div className={`${styles.compContainer} ${styles.musicVideos}`} id="musicVideos">
                <h1 className={styles.compHeader}>VIDEOS</h1>
                <VideoSection videosData={videoSection[1]} id="musicVideos"/>
              </div>
              <div className={`${styles.compContainer} ${styles.photography}`} id="photography">
                <h1 className={styles.compHeader}>PHOTOGRAPHY</h1>
                <PhotoSection photosData={videoSection[0]}/>
              </div>
              <div className={`${styles.compContainer} ${styles.verticalVideos}` } id="verticalVideos">
                <h1 className={styles.compHeader}>VERTICAL VIDEOS</h1>
                <VerticalSection videosData={videoSection[4]}/>
              </div>
              <div className={`${styles.compContainer} ${styles.about}` } id="about">
                <h1 className={styles.compHeader}>ABOUT</h1>
                <AboutSection aboutData={videoSection[3]}/>
              </div>
              <div className={`${styles.compContainer} ${styles.musicVideos} ${styles.gears}`} id="gears">
                <h1 className={styles.compHeader}>GEAR RENTALS</h1>
                <GearSection gearsData={gearSection[0]}/>
              </div>
              <div className={`${styles.compContainer} ${styles.about}` } id="fabrics">
                <h1 className={styles.compHeader}>FABRICS</h1>
                <FabricSection photosData={videoSection[2]}/>
              </div>
              <div className={`${styles.compContainer} ${styles.contact}`} id="contact">
                <h1 className={styles.compHeader}>CONTACT</h1>
                <Contact/>
              </div>
            



            
            
            
          </div>
            }
           
            
            
            
      </main>
    </>
  )
}

export const getStaticProps = async() => {
  const introData = await client.getEntries({ content_type: "introductionPage" });
  const videoSectionData = await client.getEntries({ content_type: "musicVideos" });
  const gearSectionData = await client.getEntries({ content_type: "gearSection" })

  
  return {
    props: {
      introductionPhotos: introData.items,
      videoSection: videoSectionData.items,
      gearSection: gearSectionData.items,
      revalidate: 70,
    }
  }
}
