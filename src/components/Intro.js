import styles from '@/styles/Intro.module.css';
import { client } from '@/lib/contentful';
import { useSwipeable } from 'react-swipeable';
import ContentfulImage from '@/components/ContentfulImage';
import React,{useState, useEffect, useRef} from 'react';
import Image from 'next/image';
import scrollDown from '../../public/images/scroll-down.gif';

const INITIAL_TIMER = 30;
const TARGET_TIMER = 0;
const Intro = ({ introPhotos, setIntroFinish }) => {
    
    // const {photos} = introPhotos;
    
    const listRef = React.useRef([]);
    listRef.current = introPhotos[0].fields.images.map((_, i) => listRef.current[i] ?? React.createRef());
    const [scrollPos, setScrollPos ] = useState(0);
    const [step, setStep ] = useState(0);
    const [activePhoto, setActivePhoto ] = useState(0);
    const [hideIntro, setHideIntro] = useState(false);
    const [hideScroll, setHideScroll] = useState(false);
    const [timer, setTimer] = useState(INITIAL_TIMER);
    const interval = useRef();
  
    
    
    useEffect(()=>{
        console.log("scroll pos: ", scrollPos);
        // console.log(window.innerWidth/12);
        //this is window width / 2 / 12(# of increments)
        console.log('active photo: ' , activePhoto);
        console.log('step: ', step)

        if(activePhoto < introPhotos[0].fields.images.length - 3){
            if(scrollPos % 8 == 0){
                // console.log('scroll position hit: ' , scrollPos);
                setActivePhoto(scrollPos/8);
                setStep(0);
            }
        }else{
            if(scrollPos % 8 == 0){
                if(window.innerWidth > 750){
                    if(activePhoto == introPhotos[0].fields.images.length - 1 && step == 90){
                        setHideIntro(true);
                        setIntroFinish(true);
                    }else{
                        console.log('LAST 3 IMAGES');
    
                        setActivePhoto(scrollPos/8);
                        setStep(10);
                    }
                }else{
                    if(activePhoto == introPhotos[0].fields.images.length - 1 && step == 8){
                        setHideIntro(true);
                        setIntroFinish(true);
                    }else{
                        console.log('LAST 3 IMAGES');
    
                        setActivePhoto(scrollPos/8);
                        setStep(0);
                    }
                }
                
                
            }
        }
        
        const throttle = (fn, wait) => {
            var time = Date.now();

            return function(event) {
              // we dismiss every wheel event with deltaY less than 4
              if (Math.abs(event.deltaY) < 4) return
        
              if ((time + wait - Date.now()) < 0) {
                fn(event);
                time = Date.now();
              }
            }
        }

        const loop = (fn, wait) => {
            setInterval(()=>{
                return function(event){
                    fn(event);
                }
        }, wait)
        }
        

        const handleScroll = (e) =>{
            e.preventDefault();
            var realDelta = e.wheelDelta;
            // var realDelta = e.deltaY;
            // if(Math.abs(e.deltaY) == 1){
            //     realDelta = e.deltaY * 100;
            // }else if(Math.abs(e.deltaY) == 0 || e.deltaY == -0){
            //     realDelta = 100;
            // }else{
            //     realDelta = e.deltaY;
            // }
            console.log('wheel delta: ', e.detail);
            if(e.detail > 0 || realDelta < 0){
                setScrollPos(scrollPos + 1);
            }
            // setScrollPos(Math.round(scrollPos + realDelta/100));

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
        window.addEventListener('mousewheel', throttle(handleScroll, 100));
        return()=>{
            window.removeEventListener('mousewheel', throttle(handleScroll, 100));
            
        }
    }, [scrollPos, activePhoto, step, hideIntro, timer])

    useEffect(() => {
        const handleMobileScroll = (e) => {
            e.preventDefault();

            setInterval(()=>{
                
                    setScrollPos(oldScrollPos => oldScrollPos+ 1);
                    setStep(oldStep => oldStep + 1);
                    // if(scrollPos == 1){
                    //     setHideScroll(oldHideScroll => !oldHideScroll);
                    // }
        
                    // if(activePhoto < introPhotos[0].fields.images.length - 3){
                    //     if(activePhoto % 2 == 0){
                    //             setStep(oldStep => oldStep + 1);

                    //     }else{
                    //             setStep(oldStep => oldStep - 1);
                    //             console.log('odd photo: ', step);

                           
                    //     }
                    // }else{
                    //         if(step == 10){
                    //             setStep(20);
                    //         }else{
                    //             console.log("huh");
                    //             setStep(oldScrollPos => ((oldScrollPos % 8) + 2) * 10);
                    //         }
                    // }
    
            }, 100)}
        window.addEventListener('click', handleMobileScroll);
        return () => {
            clearInterval(handleMobileScroll);
            window.removeEventListener('click', handleMobileScroll);
          };
    }, [])
    const handlers = useSwipeable({
        // onSwiping: (eventData) => {
        //     console.log(eventData);
        //     if(eventData.deltaY > 0){
        //         setScrollPos(scrollPos + 1);
        //     }
        //     if(scrollPos == 1){
        //         setHideScroll(true);
        //     }
        //     if(activePhoto < introPhotos[0].fields.images.length - 3){
        //         if(scrollPos % 8 == 0){
        //             console.log('scroll position hit: ' , scrollPos);
        //             setActivePhoto(scrollPos/8);
        //             setStep(0);
        //         }
        //         if(activePhoto % 2 == 0){
        //             setStep(scrollPos % 8);
        //         }else{
        //             setStep(-(scrollPos % 8));
        //             console.log('odd photo: ', step);
        //         }
        //     }else{
        //             console.log(introPhotos[0].fields.images.length);
        //             if(activePhoto == introPhotos[0].fields.images.length - 1 && step == 70){
        //                 console.log('ENDINGINGINGD');
        //                 setHideIntro(true);
        //                 setIntroFinish(true);
        //             }else{
        //                 if(scrollPos % 8 == 0){
        //                     setActivePhoto(scrollPos/8);
        //                     setStep(10);
        //                 }else{
        //                     console.log('LAST 3 IMAGES');
        //                     // setActivePhoto(scrollPos/8);
        //                     setStep(((step / 10) + 1) * 10);
        //                 }
                        
        //             }            
        //     }
        // },
        // onTouchStartOrOnMouseDown: ({event}) => {
        //     setInterval(function(){
        //         setScrollPos(scrollPos + 1);
        //         if(scrollPos == 1){
        //             setHideScroll(true);
        //         }
        //         if(activePhoto < introPhotos[0].fields.images.length - 3){
        //             if(scrollPos % 8 == 0){
        //                 console.log('scroll position hit: ' , scrollPos);
        //                 setActivePhoto(scrollPos/8);
        //                 setStep(0);
        //             }
        //             if(activePhoto % 2 == 0){
        //                 setStep(scrollPos % 8);
        //             }else{
        //                 setStep(-(scrollPos % 8));
        //                 console.log('odd photo: ', step);
        //             }
        //         }else{
        //                 console.log(introPhotos[0].fields.images.length);
        //                 if(activePhoto == introPhotos[0].fields.images.length - 1 && step == 70){
        //                     console.log('ENDINGINGINGD');
        //                     setHideIntro(true);
        //                     setIntroFinish(true);
        //                 }else{
        //                     if(scrollPos % 8 == 0){
        //                         setActivePhoto(scrollPos/8);
        //                         setStep(10);
        //                     }else{
        //                         console.log('LAST 3 IMAGES');
        //                         // setActivePhoto(scrollPos/8);
        //                         setStep(((step / 10) + 1) * 10);
        //                     }
                            
        //                 }            
        //         }
        //     }, 500)
        // },
        // onSwipedUp: (eventData) => {
        //     console.log(eventData);
        //     if(eventData.deltaY < 0){
        //         setScrollPos(scrollPos + 1);
        //     }
        //     if(scrollPos == 1){
        //         setHideScroll(true);
        //     }
        //     if(activePhoto < introPhotos[0].fields.images.length - 3){
        //         if(scrollPos % 8 == 0){
        //             console.log('scroll position hit: ' , scrollPos);
        //             setActivePhoto(scrollPos/8);
        //             setStep(0);
        //         }
        //         if(activePhoto % 2 == 0){
        //             setStep(scrollPos % 8);
        //         }else{
        //             setStep(-(scrollPos % 8));
        //             console.log('odd photo: ', step);
        //         }
        //     }else{
        //             console.log(introPhotos[0].fields.images.length);
        //             if(activePhoto == introPhotos[0].fields.images.length - 1 && step == 70){
        //                 console.log('ENDINGINGINGD');
        //                 setHideIntro(true);
        //                 setIntroFinish(true);
        //             }else{
        //                 if(scrollPos % 8 == 0){
        //                     setActivePhoto(scrollPos/8);
        //                     setStep(10);
        //                 }else{
        //                     console.log('LAST 3 IMAGES');
        //                     // setActivePhoto(scrollPos/8);
        //                     setStep(((step / 10) + 1) * 10);
        //                 }
                        
        //             }            
        //     }
        // },
        swipeDuration: 500,
        preventScrollOnSwipe: true
      });
   
    return(
        <>
            <div {...handlers} className={hideIntro ? `${styles.introContainer} ${styles.inactive}`: `${styles.introContainer}`} >
                <div className={hideScroll ? `${styles.scrollTextContainer} ${styles.inactive}` : `${styles.scrollTextContainer}`}>
                    <div className={`${styles.scrollContainer}`}>
                    <div className={`${styles.scroller}`}></div>
                    </div>
                </div>
                <div>{scrollPos}</div>
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