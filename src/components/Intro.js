import styles from '@/styles/Intro.module.css';
import { client } from '@/lib/contentful';
import ContentfulImage from '@/components/ContentfulImage';
import React,{useState, useEffect, useRef} from 'react';
import Image from 'next/image';
import scrollDown from '../../public/images/scroll-down.gif';


const Intro = ({ introPhotos, setIntroFinish }) => {
    
    // const {photos} = introPhotos;
    
    const listRef = React.useRef([]);
    listRef.current = introPhotos[0].fields.images.map((_, i) => listRef.current[i] ?? React.createRef());
    const [scrollPos, setScrollPos ] = useState(0);
    const [step, setStep ] = useState(0);
    const [activePhoto, setActivePhoto ] = useState(0);
    const [hideIntro, setHideIntro] = useState(false);
    const [hideScroll, setHideScroll] = useState(false);
    
    
    useEffect(()=>{
        console.log("scroll pos: ", scrollPos);
        // console.log(window.innerWidth/12);
        //this is window width / 2 / 12(# of increments)
        console.log('active photo: ' , activePhoto);
        console.log('step: ', step)

        if(activePhoto < introPhotos[0].fields.images.length - 3){
            if(scrollPos % 8 == 0){
                console.log('scroll position hit: ' , scrollPos);
                setActivePhoto(scrollPos/8);
                setStep(0);
            }
        }else{
            if(scrollPos % 8 == 0){
                if(activePhoto == introPhotos[0].fields.images.length - 1 && step == 90){
                    setHideIntro(true);
                    setIntroFinish(true);
                }else{
                    console.log('LAST 3 IMAGES');
                    setActivePhoto(scrollPos/8);
                    setStep(10);
                }
                
            }
        }
    
        const handleScroll = (e) =>{
            var realDelta = e.deltaY;
            if(Math.abs(e.deltaY) == 1){
                realDelta = e.deltaY * 100;
            }else if(Math.abs(e.deltaY) == 0 || e.deltaY == -0){
                realDelta = 100;
            }else{
                realDelta = e.deltaY;
            }
            setScrollPos(Math.round(scrollPos + realDelta/100));

            if(scrollPos == 1){
                setHideScroll(true);
            }

            if(activePhoto < introPhotos[0].fields.images.length - 3){
                if(activePhoto % 2 == 0){
                    setStep(scrollPos % 8);
                }else{
                    setStep(-(scrollPos % 8));
                    console.log('odd photo: ', step);
                }
            }else{
                    if(step == 10){
                        setStep(20);
                    }else{
                        console.log("huh");
                        setStep(((scrollPos % 8) + 2) * 10);
                    }
            }
            
        
        };
        window.addEventListener('wheel', handleScroll);
        return()=>{
            window.removeEventListener('wheel', handleScroll);
        }
    }, [scrollPos, activePhoto, step, hideIntro])
    return(
        <>
            <div className={hideIntro ? `${styles.introContainer} ${styles.inactive}`: `${styles.introContainer}`}>
                <div className={hideScroll ? `${styles.scrollTextContainer} ${styles.inactive}` : `${styles.scrollTextContainer}`}>
                    <div className={`${styles.scrollContainer}`}>
                    <div className={`${styles.scroller}`}></div>
                    </div>
                </div>
                <div className={styles.photosContainer}>
                
                {introPhotos[0].fields.images && introPhotos[0].fields.images.map((photo, i) => {
                    return(
                        <div key={i} className={activePhoto == i ? `${styles.photoContainer} ${styles.active}` : `${styles.photoContainer}`} data-step={step} ref={listRef.current[i]}>
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
                        
                    )           
                })}
                </div>
                
            </div>
        </>
    )
}

export default Intro;
// export const getStaticProps = async() => {
//     const response = await client.getEntries({ content_type: "gallery" });
  
//     return {
//       props: {
//         introPhotos: response.items,
//         revalidate: 70,
//       }
//     }
//   }