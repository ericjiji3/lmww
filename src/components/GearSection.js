import ContentfulImage from "./ContentfulImage";
import RichText from "./Richtext";
import styles from '@/styles/GearSection.module.css';


const GearSection = ({ gearsData}) => {
    console.log(gearsData);

    return(
        <>
            <div className={`container ${styles.gearSection}`}>
                <RichText content={gearsData.fields.gearGeneralDescription}/>
                {gearsData.fields.gearField.map((gearData, i) => {
                    return(
                            <div className={`${styles.contentContainer}`} key={i}>
                                <ContentfulImage
                                    src={gearData.fields.image[0].fields.file.url}
                                    width={gearData.fields.image[0].fields.file.details.image.width}
                                    height={gearData.fields.image[0].fields.file.details.image.height}
                                    className={`${styles.photo}`}
                                    quality='100'
                                    alt="oops"
                                    priority
                                    style={{float: 'left'}}
                                    
                                />
                                <h2>{gearData.fields.gearName}</h2>
                                <span><b>Price: {gearData.fields.price}</b></span>
                                <RichText content={gearData.fields.description}/>
                            </div>
                    )
                })}
            </div>
        </>
    )
}

export default GearSection;