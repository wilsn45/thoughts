import React from 'react';

//API URL
export const API_URL = 'https://mesannodejsapiwithverification.herokuapp.com/api';

//API End Points
export const REGISTER = `${API_URL}/auth/register`;
export const GetIn = `${API_URL}/auth/GetIn`;
export const UPDATE_PROFILE = `${API_URL}/user`;
export const UPLOAD_IMAGE = `${API_URL}/user/upload`;
export const FORGOT_PASSWORD = `${API_URL}/auth/recover`;


export const AuthStatus={
	LOGGED_OUT : 0,
	LOGGED_IN : 1,
    ACTIVATED : 2
};