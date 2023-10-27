import ContentfulImage from "./ContentfulImage";
import RichText from "./Richtext";


const Card = ({ post }) => {
    const {title, images, description} = post.fields;
    
    return(
        <>
            <div>
                <div>{title}</div>
                <div>
                    {images.map((image, i) => {
                        return(
                                <ContentfulImage
                                key={i}
                                src={image.fields.file.url}
                                width={image.fields.file.details.image.width}
                                height={image.fields.file.details.image.height}
                                quality='100'
                                alt="oops"
                            />
                            )
                    })}
                </div>
                <RichText content={description}/>
            </div>
        </>
    )
}

export default Card;