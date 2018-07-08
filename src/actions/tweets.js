import { saveLikeToggle } from "../utils/api";

export const RECEIVE_TWEETS = "RECEIVE_TWEETS";
export const TOGGLE_TWEETS = "TOGGLE_TWEETS";

export function receiveTweets(tweets) {
    return {
        type: RECEIVE_TWEETS,
        tweets
    };
}

function toggleTweets({ id, authedUser, hasLiked }) {
    return {
        type: TOGGLE_TWEETS,
        id,
        authedUser,
        hasLiked
    };
}

export function handleToggleTweets(info) {
    return dispatch => {
        dispatch(toggleTweets(info));

        return saveLikeToggle(info)
            .then("handleToggleTweets successfully")
            .catch(err => {
                console.warn("Error in handleToggleTweet: ", err);
                dispatch(toggleTweets(info));
                alert("There was an error in liking the tweet");
            });
    };
}
