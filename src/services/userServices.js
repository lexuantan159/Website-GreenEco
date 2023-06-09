import * as request from '../ultis/request';
import axios from 'axios';

const ROLE_USERS = 'user/';
export const getUser = async (accessToken) => {
    try {
        const response = await request.get(ROLE_USERS, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        return {
            fullname : response.userData.fullname,
            address : response.userData.address,
            email : response.userData.email,
            phone : response.userData.phone,
            password : response.userData.password,
            statusCode: 200,
        };
    } catch (error) {
        return {
            error,
            statusCode: 400,
        };
    }
};

const EDID_USERS = 'user/edit-profile';
export const updateUserPassword = async (accessToken, oldPassword, newPassword) => {
  try {
    console.log(accessToken);
    console.log(typeof oldPassword);
    console.log(typeof newPassword);

    const response = await request.put(EDID_USERS, {
      headers: { Authorization: `Bearer ${accessToken}` },
      data: {
        oldPassword : oldPassword,
        newPassword : newPassword,
      },
    });

    return {
      message: response.userData.message,
      statusCode: 200,
    };
  } catch (error) {
    return {
      error : error,
      statusCode: 400,
    };
  }
};