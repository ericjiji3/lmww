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
                                <h3>{gearData.fields.gearName}</h3>
                                {(()=>{
                                    console.log(gearData.fields.price.substring(1, gearData.fields.price.indexOf("/")));
                                    if(gearData.fields.price.substring(1, gearData.fields.price.indexOf("/")) == '5'){
                                        return(
                                            <div className={styles.fiveDollar}></div>
                                        )
                                    }else if(gearData.fields.price.substring(1, gearData.fields.price.indexOf("/")) == '10'){
                                        return(
                                            <div className={styles.tenDollar}></div>
                                        )
                                    }else if(gearData.fields.price.substring(1, gearData.fields.price.indexOf("/")) == '15'){
                                        return(
                                            <div className={styles.fifteenDollar}></div>
                                        )
                                    }else if(gearData.fields.price.substring(1, gearData.fields.price.indexOf("/")) == '20'){
                                        return(
                                            <div className={styles.twentyDollar}></div>
                                        )
                                    }else if(gearData.fields.price.substring(1, gearData.fields.price.indexOf("/")) == '30'){
                                        return(
                                            <div className={styles.thirtyDollar}></div>
                                        )
                                    }
                                })()
                                }
                                
                                <RichText content={gearData.fields.description}/>
                            </div>
                    )
                })}
            </div>
        </>
    )
}

export default GearSection;