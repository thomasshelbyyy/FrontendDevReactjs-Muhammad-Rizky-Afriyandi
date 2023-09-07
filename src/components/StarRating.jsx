import { AiFillStar, AiOutlineStar } from "react-icons/ai"

const StarRating = ({rating}) => {
    const stars = []
    for(let i = 1; i <= 5; i++) {
        const isFilled = i <= rating
        stars.push(
            <div key={i} className="star">
                {isFilled ? <AiFillStar className="star-icon" /> : <AiOutlineStar  className="star-icon"/>}
            </div>
        )
    }
    return(
        <div className="stars-container">{stars}</div>
    )
}

export default StarRating