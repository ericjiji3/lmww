import ContentfulImage from "./ContentfulImage";
import RichText from "./Richtext";
import styles from '@/styles/FabricSection.module.css';
import { useRef, useEffect } from 'react';
import { register } from 'swiper/element/bundle';

register();

const FabricSection = ({ photosData }) => {
    const swiperElRef = useRef(null);
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
            <div className={`${styles.fabricSection}`}>
                {photosData.fields.reference.map((photoData, i) => {
                    return(
                            <div className={`${styles.contentContainer}`} key={i}>
                                <swiper-container
                                    ref={swiperElRef}
                                    slides-per-view="1"
                                    navigation="true"
                                    pagination="false"
                                    loop="true"
                                    className={`${styles.carousel}`}
                                    
                                >
                                {
                                    photoData.fields.media.map((photo, i) => {
                                        return(
                                            
                                                <swiper-slide key={i} style={{paddingBottom : 25}}>
                                                    <div className={`container`}>
                                                    <ContentfulImage
                                                        src={photo.fields.file.url}
                                                        width={photo.fields.file.details.image.width}
                                                        height={photo.fields.file.details.image.height}
                                                        className={`${styles.photo}`}
                                                        quality='100'
                                                        alt="oops"
                                                        priority
                                                    />
                                                    </div>
                                                </swiper-slide>
                                            
                                            
                                        )
                                }) }
                                </swiper-container>
                                <div className={`container ${styles.titleDescription}`}>
                                    <RichText content={photoData.fields.description}/>
                                </div>
                                <div className={styles.swipeContain}>
                                
                                </div>
                                
                                
                            </div>
                        
                    )
                })}
            </div>
        </>
    )
}

export default FabricSection;