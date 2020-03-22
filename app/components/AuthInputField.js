import React, { useState } from 'react';
import {View, Image,TextInput, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const icons={
    "phone": "phone",
    "otc": "lock",
};

const placeHolderText={
    "email": "Email id",
    "otc": "One time code",
    "phone": "Phone number",
    "user": "Name"
};

const keyboardType={
    "email": "email-address",
    "otc": "phone-pad",
    "phone": "phone-pad",
    "user": "email-address"
};
const maxLength={
    "otc": 4,
    "phone": 15,
};


export default function AuthInputField ({type, updateValueCallback,isEnable}) {
    
    return (
            <View  style={styles.fieldView}>
             <Icon name={icons[type]}  size={32} />

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
        height : 40,
        width: 250,
        borderBottomWidth : 2,
        borderColor : "black",
        flexDirection: "row",
        alignItems : "flex-end",
        marginBottom: 50
    },
    textInputView : {
        marginLeft: 10,
        width: 200, 
        fontSize: 25,   
        alignSelf: "flex-end",
    
    },
    textInputViewDisabled : {
        marginLeft: 10,
        width: 200, 
        fontSize: 25,
        alignSelf: "flex-end",
        color : "grey"
    }

});