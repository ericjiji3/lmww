import styles from '@/styles/Intro.module.css';
import { client } from '@/lib/contentful';
import ContentfulImage from '@/components/ContentfulImage';
import {useState, useEffect} from 'react';

export default function Intro({ introPhotos }){
    
    // const {photos} = introPhotos;
    console.log(introPhotos)
    return(
        <>
            <div className={styles.introContainer}>
                INTRO PAGE
                <div className={styles.photosContainer}>
                
                {/* {introPhotos && introPhotos.map((photo, i) => {
                    return(
                        <ContentfulImage
                        key={i}
                        src={photo.fields.file.url}
                        width={photo.fields.file.details.image.width}
                        height={photo.fields.file.details.image.height}
                        quality='100'
                        alt="oops"
                        />
                    )           
                })} */}
                </div>
                
            </div>
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