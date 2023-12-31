import ContentfulImage from "./ContentfulImage";
import RichText from "./Richtext";
import styles from '@/styles/VerticalSection.module.css';
import { useRef, useEffect } from 'react';
import { register } from 'swiper/element/bundle';

register();

const VerticalSection = ({ videosData}) => {
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
            <div className={`${styles.verticalSection}`}>
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
                            <div className={`container ${styles.contentContainer}`}>
                                <a href={videoData.fields.link} target="_blank" className={`${styles.linkContainer}`}>
                                <ContentfulImage
                                    src={videoData.fields.media[0].fields.file.url}
                                    width={videoData.fields.media[0].fields.file.details.image.width}
                                    height={videoData.fields.media[0].fields.file.details.image.height}
                                    className={`${styles.photo}`}
                                    quality='100'
                                    alt="oops"
                                    priority
                                    // style={{float: 'left', marginRight: '25px'}}
                                    
                                />
                                </a>
                                <h3>{videoData.fields.title}</h3>
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

export default VerticalSection;