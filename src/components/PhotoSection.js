import ContentfulImage from "./ContentfulImage";
import RichText from "./Richtext";
import styles from '@/styles/PhotoSection.module.css';
import { useRef, useEffect } from 'react';
import { register } from 'swiper/element/bundle';

register();

const PhotoSection = ({ photosData }) => {
    const swiperElRef = useRef(null);
    const swiperElRef2 = useRef(null);
    console.log(photosData);

    useEffect(() => {
        // listen for Swiper events using addEventListener
        swiperElRef.current.addEventListener('swiperprogress', (e) => {
          const [swiper, progress] = e.detail;
          console.log(progress);
        });
    
        swiperElRef.current.addEventListener('swiperslidechange', (e) => {
          console.log('slide changed');
        });
      }, []);

    return(
        <>
            <div className={`${styles.photoSection}`}>
                <swiper-container
                    ref={swiperElRef}
                    slides-per-view="1"
                    navigation="true"
                    pagination="true"
                    loop="true"
                    className={`${styles.carousel}`}

                >
                {photosData.fields.reference.map((photoData, i) => {
                    return(
                        <swiper-slide key={i} style={{paddingBottom : 30}}>
                            <div className={`${styles.contentContainer}`}>
                                <div className={`${styles.titleDescription}`}>
                                    <h2>{photoData.fields.title}</h2>
                                    <RichText content={photoData.fields.description}/>
                                </div>
                                <swiper-container
                                    ref={swiperElRef2}
                                    slides-per-view="1"
                                    navigation="true"
                                    pagination="true"
                                    loop="true"
                                    className={`${styles.carousel}`}
                                    style={{width : 500}}
                                >
                                {
                                    photoData.fields.media.map((photo, i) => {
                                        return(
                                            <swiper-slide key={i} style={{paddingBottom : 30}}>
                                            <ContentfulImage
                                                src={photo.fields.file.url}
                                                width={photo.fields.file.details.image.width}
                                                height={photo.fields.file.details.image.height}
                                                className={`${styles.photo}`}
                                                quality='100'
                                                alt="oops"
                                                priority
                                            />
                                            </swiper-slide>
                                        )
                                }) }
                                </swiper-container>
                                
                            </div>
                        </swiper-slide>
                    )
                })}
                </swiper-container>
            </div>
        </>
    )
}

export default PhotoSection;