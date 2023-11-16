import ContentfulImage from "./ContentfulImage";
import RichText from "./Richtext";
import styles from '@/styles/About.module.css';


const About = ({ aboutData}) => {
    console.log(aboutData);


    return(
        <>  
            <div className={`${styles.aboutSection}`}>
                <div>
                    {aboutData.fields.reference.map((about, i) => {
                        return(
                                <div className={`container ${styles.contentContainer}`} key={i}>
                                    <ContentfulImage
                                        src={about.fields.media[0].fields.file.url}
                                        width={about.fields.media[0].fields.file.details.image.width}
                                        height={about.fields.media[0].fields.file.details.image.height}
                                        className={`${styles.photo}`}
                                        quality='100'
                                        alt="oops"
                                        priority
                                        // style={{float: i % 2 == 0 ? 'right' : 'left', marginLeft: i % 2 == 0 ? '25px' : '0', marginRight: i % 2 == 0 ? '0' : '25px'}}
                                        
                                    />
                                    <div className={styles.text}>
                                        <h3>{about.fields.title}</h3>
                                        <RichText content={about.fields.description}/>
                                    </div>
                                    
                                </div>
                        )
                    })}
                </div>
                
            </div>
        </>
    )
}

export default About;