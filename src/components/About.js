import ContentfulImage from "./ContentfulImage";
import RichText from "./Richtext";
import styles from '@/styles/About.module.css';
import { useRef, useEffect } from 'react';

const About = ({ aboutData }) => {
    console.log(aboutData);


    return(
        <>  
            <div className={`${styles.aboutSection}`}>
                <h2 className={styles.header}>ABOUT</h2>
                {aboutData.fields.reference.map((about, i) => {
                    return(
                            <div className={`${styles.contentContainer}`}>
                                <ContentfulImage
                                    src={about.fields.media[0].fields.file.url}
                                    width={about.fields.media[0].fields.file.details.image.width}
                                    height={about.fields.media[0].fields.file.details.image.height}
                                    className={`${styles.photo}`}
                                    quality='100'
                                    alt="oops"
                                    priority
                                    style={{float: i % 2 == 0 ? 'right' : 'left'}}
                                    
                                />
                                <h2>{about.fields.title}</h2>
                                <RichText content={about.fields.description}/>
                            </div>
                    )
                })}
            </div>
        </>
    )
}

export default About;