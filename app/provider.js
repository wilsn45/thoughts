import React, {useMemo, useReducer, useContext} from 'react';
import axios from "axios";
import * as userStorage from "thoughts/app/storage/Local/UserStorage";

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
            let token = await getUserToken();
            let registered = await getIsUserActive();
              
            if (token) {
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


// HELPERS ===================================

export const getUserToken = async () => {
    try {
        let tokenPromise = userStorage.getUserToken()
        let userToken = await tokenPromise;
        return userToken
    } catch (error) {
        throw new Error(error)
   }
};

export const getIsUserActive = async () => {
    try {
        let activePromise = userStorage.getIsUserActive()
        let isActive = await activePromise;
        return isActive
    } catch (error) {
        throw new Error(error)
   }
};

