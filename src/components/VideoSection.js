import ContentfulImage from "./ContentfulImage";
import RichText from "./Richtext";
import styles from '@/styles/VideoSection.module.css';
import { useRef, useEffect } from 'react';
import { register } from 'swiper/element/bundle';

register();

const VideoSection = ({ videosData }) => {
    const swiperElRef = useRef(null);
    console.log(videosData);

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
            <div className={`${styles.videoSection}`}>
                <swiper-container
                    ref={swiperElRef}
                    slides-per-view="1"
                    navigation="true"
                    pagination="true"
                    loop="true"
                    className={`${styles.carousel}`}
                >
                {videosData.fields.reference.map((videoData, i) => {
                    return(
                        <swiper-slide key={i} style={{paddingBottom : 30}}>
                            <div className={`${styles.contentContainer}`}>
                                <ContentfulImage
                                    src={videoData.fields.media[0].fields.file.url}
                                    width={videoData.fields.media[0].fields.file.details.image.width}
                                    height={videoData.fields.media[0].fields.file.details.image.height}
                                    className={`${styles.photo}`}
                                    quality='100'
                                    alt="oops"
                                    priority
                                    style={{float: 'left'}}
                                    
                                />
                                <h2>{videoData.fields.title}</h2>
                                <RichText content={videoData.fields.description}/>
                            </div>
                        </swiper-slide>
                    )
                })}
                </swiper-container>
            </div>
        </>
    )
}

export default VideoSection;