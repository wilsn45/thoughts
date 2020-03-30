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

const placeHolderImage = require('../assets/placeholder/profilePicPlaceholder.png')

export default function ImageView ({source, cancelCallback}) {
    
    return (
            <View  style={styles.fieldView}>
              <Image source = {placeHolderImage} style = {styles.imageView}/>
              <Icon name={"x"}  size={32}  style = {styles.cancelView} />
            </View>

        );
};


const styles = StyleSheet.create({
    mainView : {
        height : 50,
        width: 100,
        borderBottomWidth : 1,
        borderColor : "black",
    },
    cancelView : {
        height : 30,
        width: 30,
        backgroundColor : "#fff",
        borderRadius : 15,
        position : 'absolute',
       borderWidth : 1,
        borderColor : "#fff"
    },
    imageView : {
        height : 140,
        width: 100,
        margin : 10
    }
    

});