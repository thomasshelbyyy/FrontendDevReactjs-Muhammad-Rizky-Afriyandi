import StarRating from "./StarRating"
import noProfile from "../assets/no-profile.png"

const ReviewCard = ({author, rating, title, summary})=> {
    return(
        <div className="review-card"> 
            <div className="user-info">
                <img src={noProfile} alt="" className="author-image" />
                <p>{author}</p>
            </div>
            <div>
                <StarRating rating={rating} />
                <h4>{title}</h4>
                <p>{summary}</p>
            </div>
        </div>
    )
}

export default ReviewCard