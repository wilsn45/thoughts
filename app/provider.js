import React, {useMemo, useReducer, useContext} from 'react';
import axios from "axios";
import * as userStorage from "thoughts/app/storage/Local/UserStorage";
import  * as User  from "thoughts/app/User";

//IMPORT REDUCER, INITIAL STATE AND ACTION TYPES
import reducer, {initialState, LOGGED_IN, LOGGED_OUT} from "./reducer";
import {AuthStatus} from "thoughts/app/storage/Constants"

// CONFIG KEYS [Storage Keys]===================================
export const TOKEN_KEY = 'token';
export const USER_KEY = 'user';
export const keys = [TOKEN_KEY, USER_KEY];

// CONTEXT ===================================
const AuthContext = React.createContext();

function AuthProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState || {});


    const getAuthState = async () => {
        try {
          
            let token = await userStorage.getUserToken();
            let registered = await userStorage.getIsUserActive()
            if (token) {
                let username = await userStorage.getUserName();
                let sex = await userStorage.getUserSex();
                let isPrivate = await userStorage.getIsPrivate();
                let thoughtLastTime = await userStorage.getThoughtsLast();
                let messageLastTime = await userStorage.getMessageLast();
                User.uid = token
                User.username = username
                User.sex = sex
                User.isPrivate = isPrivate
                User.thoughtsLast = thoughtLastTime
                User.messageLast = messageLastTime
                return registered ? AuthStatus.ACTIVATED : AuthStatus.LOGGED_IN
            } else {
                return AuthStatus.LOGGED_OUT
            }

        } catch (error) {
            throw new Error(error)
        }
    };

    const value = useMemo(() => {
        return {state, getAuthState};
    }, [state]);

    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    );
}

const useAuth = () => useContext(AuthContext);
export { AuthContext, useAuth }
export default AuthProvider;
