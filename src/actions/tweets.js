import { saveLikeToggle, saveTweet } from "../utils/api";
import { showLoading, hideLoading } from "react-redux-loading";

export const RECEIVE_TWEETS = "RECEIVE_TWEETS";
export const TOGGLE_TWEETS = "TOGGLE_TWEETS";
export const ADD_TWEET = "ADD_TWEET";

function addTweet(tweet) {
    return {
        type: ADD_TWEET,
        tweet
    };
}

export function handleAddTweet(text, replyingTo) {
    return (dispatch, getState) => {
        const { authedUser } = getState();
        dispatch(showLoading);
        return saveTweet({
            text,
            author: authedUser,
            replyingTo
        })
            .then(tweet => dispatch(addTweet(tweet)))
            .then(() => dispatch(hideLoading));
    };
}

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
