import * as request from '../ultis/request';

const CONTACT_ENDPOINT = 'user/send-contact';

export const contact = async (name, email, message) => {
    try {
        const response = await request.post(CONTACT_ENDPOINT, { name:name, email: email, message:message});
        console.log(response);
        return {
            response: response.statusCode,
            statusCode: 200,
        };
      
    } catch (error) {
        return {
            error,
            statusCode: 400,
        };
    }
};

