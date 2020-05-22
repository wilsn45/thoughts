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

            let username = await userStorage.getUserName()
            if(!username) {
              console.log("i am no username set")
              return AuthStatus.LOGGED_OUT
            }

            console.log("i am active")
            let token = await userStorage.getUserToken()
            let sex = await userStorage.getUserSex()
            let isPrivate = await userStorage.getIsPrivate()
            User.uid = token
            User.username = username
            User.sex = sex
            User.isPrivate = isPrivate
            return AuthStatus.ACTIVATED

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
