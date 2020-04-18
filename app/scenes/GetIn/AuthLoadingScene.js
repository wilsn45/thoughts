import React, {useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import { StackActions } from 'react-navigation';
import { useAuth } from "thoughts/app/provider";
var Spinner = require('react-native-spinkit');
import {AuthStatus} from "thoughts/app/storage/Constants"
import * as userStorage from "thoughts/app/storage/Local/UserStorage";

export default function AuthLoading(props) {
    const {navigate} = props.navigation;
    const { getAuthState } = useAuth();

    useEffect(() => {
        initialize()
    }, []);

    async function initialize() {
        try {
             let status = await getAuthState();
             // navigate('Auth')

             if (status == AuthStatus.ACTIVATED) {
                navigate('App');
             }
             else if (status == AuthStatus.LOGGED_IN) {
                let userNamePromise =  userStorage.getUserName()
                let userProfilePromise =  userStorage.getUserProfileMinBase64()
                let userSexPromise =  userStorage.getUserSex()
                let userCategoriesPromise =  userStorage.getUserCategories()

                let username = await userNamePromise;
                console.log("set username "+username)
                if (!username) {
                  navigate('SetUserName');
                  return
                }
                let profilePic = await userProfilePromise;
                if (!profilePic) {
                  navigate("SetProfile")
                  return
                }

                let sex = await userSexPromise
                if(!sex) {
                  navigate("SetSex")
                  return
                }

                let categories = await userCategoriesPromise
                if(!categories) {
                  navigate("SetCategories")
                  return
                }

             }
             else {
                navigate('Auth')
             }
        } catch (e) {
           console.log("error is" + e)
        }
    }

    return (
        <View style={{backgroundColor: "#fff", alignItems: 'center', justifyContent: 'center', flex: 1}}>
            <Spinner style={styles.spinner} isVisible={true} size={40} type="ArcAlt" color="#fb375b"/>
        </View>
    );
};
const styles = StyleSheet.create({


spinner: {
  marginBottom: 50
},



});
