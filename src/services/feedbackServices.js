import * as request from '../ultis/request';

const POST_FEEDBACK_ENDPOINT = 'feedback/create-feedback';

export const postFeedback = async (token, comment, prodId) => {
    try {
        const response = await request.postFeedback(
            POST_FEEDBACK_ENDPOINT,
            {
                rating: 4,
                comment: comment,
                prodId: prodId,
            },
            {
                headers: { Authorization: `Bearer ${token}` },
            },
        );
        return {
            message: response.data.message,
            statusCode: response.status,
        };
    } catch (error) {
        return {
            error: error.response.data.message,
            statusCode: error.response.status,
        };
    }
};

export const getFeedback = async (prodId) => {
    try {
        const response = await request.get(`feedback/${prodId}`);
        return {
            response: response.data.feedbackData,
            statusCode: response.status,
        };
    } catch (error) {
        return {
            error: error.response.data.message,
            statusCode: error.response.status,
        };
    }
};
