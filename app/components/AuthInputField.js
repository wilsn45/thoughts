import React, { useState } from 'react';
import {View, Image,TextInput, StyleSheet} from 'react-native';

const icons={
    "email": require("../assets/icons/emailIcon.png"),
    "otc": require("../assets/icons/otcIcon.png"),
    "phone": require("../assets/icons/phoneIcon.png")
};

const placeHolderText={
    "email": "Email id",
    "otc": "One time code",
    "phone": "Phone number",
    "user": "Name"
};

const keyboardType={
    "email": "email-address",
    "otc": "email-address",
    "phone": "phone-pad",
    "user": "email-address"
};
const maxLength={
    "otc": 4,
    "phone": 10,
};


export default function AuthInputField ({type, updateValueCallback,isEnable}) {
    
    return (
            <View  style={styles.fieldView}>
            <Image source={icons[type]}  style={{width: 30, height: 30, marginRight:10, alignSelf: "flex-end", marginBottom: 2}}/>

            <TextInput
                 style={isEnable ? styles.textInputView : styles.textInputViewDisabled}
                 placeholder= {placeHolderText[type]}
                 placeholderTextColor = "grey"
                 keyboardType =  {keyboardType[type]}
                 maxLength={maxLength[type]}
                 onChangeText={(value) => updateValueCallback(value)} 
                 editable = {isEnable}
                            />
            </View>

        );
};


const styles = StyleSheet.create({
    fieldView : {
        flex : 0.2,
        width: 250,
        borderBottomWidth : 2,
        borderColor : "black",
        flexDirection: "row",
        justifyContent : "flex-end",
    },
    textInputView : {
        width: 200, 
        fontSize: 25,   
        alignSelf: "flex-end",
    
    },
    textInputViewDisabled : {
        width: 200, 
        fontSize: 25,
        alignSelf: "flex-end",
        color : "grey"
    }

});