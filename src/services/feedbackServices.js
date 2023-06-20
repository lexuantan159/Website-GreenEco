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

const DELETE_FEEDBACK_ENDPOINT = 'feedback/delete-feedback';

export const deleteFeedback = async (token, prodId) => {
    try {
        const response = await request.reDelete(DELETE_FEEDBACK_ENDPOINT, {
            headers: { Authorization: `Bearer ${token}` },
            data: {
                prodId: prodId,
            },
        });
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

const EDIT_FEEDBACK_ENDPOINT = 'feedback/edit-feedback';
export const editFeedback = async (token, prodId, comment) => {
    try {
        const response = await request.put(
            EDIT_FEEDBACK_ENDPOINT,
            {
                rating: 4,
                prodId: prodId,
                comment: comment,
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
            statusCode: error.status,
        };
    }
};
