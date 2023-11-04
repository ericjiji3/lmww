import styles from '@/styles/Intro.module.css';
import { client } from '@/lib/contentful';
import ContentfulImage from '@/components/ContentfulImage';
import React,{useState, useEffect, useRef} from 'react';


const Intro = ({ introPhotos, setIntroFinish }) => {
    
    // const {photos} = introPhotos;
    
    const listRef = React.useRef([]);
    listRef.current = introPhotos[0].fields.images.map((_, i) => listRef.current[i] ?? React.createRef());
    const [scrollPos, setScrollPos ] = useState(0);
    const [step, setStep ] = useState(0);
    const [activePhoto, setActivePhoto ] = useState(0);
    
    
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
                
                console.log('INIT STYLE LEFT: ', listRef.current[activePhoto].current.style.left);
            }
        }else{
            if(scrollPos % 8 == 0){
                console.log('LAST 3 IMAGES');
                setActivePhoto(scrollPos/8);
                setStep(10);
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
            if(activePhoto < introPhotos[0].fields.images.length - 3){
                if(activePhoto % 2 == 0){
                    setStep(scrollPos % 8);
                }else{
                    setStep(-(scrollPos % 8));
                    console.log('odd photo: ', step);
                }
            }else{
                if(scrollPos % 10 == 0){
                    if(step == 10){
                        setStep(20);
                    }else{
                        setStep((scrollPos % 10) * 10);
                    }
                    
                }
                
            }
            
            
            // if(realDelta >= 0){
            //     if(activePhoto < introPhotos[0].fields.images.length - 1){
            //         setScrollPos(Math.round(scrollPos + realDelta/100));
            //         console.log('SCROLL POS: ', scrollPos);
            //         if(scrollPos % 12 == 0 && scrollPos != 0){
            //             setActivePhoto(activePhoto + 1);
            //             console.log('scrollCount: ', scrollPos/12);
            //             console.log('active photo: ', activePhoto);
            //             listRef.current[activePhoto].current.style.left = window.innerWidth/2 - listRef.current[activePhoto].current.offsetWidth/2;

            //         }
                    
            //         listRef.current[activePhoto].current.style.width = `${listRef.current[activePhoto].current.offsetWidth + (realDelta/5)}px`;
            //         if(activePhoto % 2 == 0){
                        
            //             console.log('POsition scrolledTo: ', imagePos.left[scrollPos]);
            //             listRef.current[activePhoto].current.style.left = `${imagePos.left[scrollPos]}px`;
            //         }else{
                        
            //             console.log('POsition scrolledTo: ', imagePos.right[scrollPos]);
            //             listRef.current[activePhoto].current.style.left= `${imagePos.right[scrollPos]}px`;
                        
            //         }
            //     }
            // }
            // let centerPos = elementPos[0].left + ((elementPos[0].right - elementPos[0].left)/2);
            // let centerPos = window.innerWidth/2;
            // console.log('ELEM POS: ', centerPos);
            // console.log('SCROLL: ', e.deltaY);
            // console.log('center pos: ', centerPos);
            // let scrollIncrement = centerPos/20;
            // console.log('scrollIncr: ', scrollIncrement);
            // if(realDelta >= 0){

            //     if(activePhoto < introPhotos[0].fields.images.length - 1 ){
            //         if(scrollPos % 11 == 0){
            //             console.log('scroll position hit: ' , scrollPos);
            //             setActivePhoto(scrollPos / 11);
            //             listRef.current[activePhoto].current.style.left = window.innerWidth/2 - listRef.current[activePhoto].current.offsetWidth/2;
            //             console.log('active photo: ' , activePhoto);
            //             console.log('INIT STYLE LEFT: ', listRef.current[activePhoto].current.style.left);
            //         }
            //         setScrollPos(Math.round(scrollPos + realDelta/100));
            //         console.log('scroll position: ' , scrollPos);
            //         listRef.current[activePhoto].current.style.width = `${listRef.current[activePhoto].current.offsetWidth + (realDelta/5)}px`;
            //         console.log('width: ', listRef.current[activePhoto].current.offsetWidth);
            //         let elementPos = listRef.current[activePhoto].current.getBoundingClientRect();
            //         if(activePhoto % 2 == 0){
            //             console.log('style.left: ', listRef.current[activePhoto].current.style.left);
            //             console.log('getClientRect: ', elementPos.left);
            //             console.log('right position: ', elementPos.right);
            //             console.log('window width: ', window.innerWidth);
            //             listRef.current[activePhoto].current.style.left = `${elementPos.left - (scrollIncrement)}px`;
            //         }else{
            //             console.log('style.left: ', listRef.current[activePhoto].current.style.left);
            //             console.log('getClientRect: ', elementPos.left);
            //             console.log('window width: ', window.innerWidth);
            //             console.log('calculate: ', elementPos.left + scrollIncrement);
            //             listRef.current[activePhoto].current.style.right= `${elementPos.right - (scrollIncrement)}px`;
                        
            //         }
            //     }else{
            //         console.log('MAX PH0TO');
            //         console.log('active photo: ' , activePhoto);
            //     }
            // }
        };
        window.addEventListener('wheel', handleScroll);
        return()=>{
            window.removeEventListener('wheel', handleScroll);
        }
    }, [scrollPos, activePhoto, step])
    return(
        <>
            <div className={styles.introContainer}>
                
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