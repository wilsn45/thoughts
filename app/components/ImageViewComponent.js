import React, { useState } from 'react';
import {View, Image,TextInput, StyleSheet,TouchableOpacity} from 'react-native';
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

export default function ImageView ({source, cancelCallback,number}) {
    
    return (
            <View  style={styles.fieldView}>
              <Image source = {source} style = {styles.imageView}/>

               <TouchableOpacity
                 style = {styles.cancelView}
                 onPress={() => cancelCallback(number)}>
                 <Icon name={"x"}  size={26} />
               </TouchableOpacity>
              </View>

        );
};


const styles = StyleSheet.create({
    mainView : {
        marginTop : 20,
        height : 50,
        width: 100,
        borderBottomWidth : 1,
        borderColor : "black",
    },
    cancelView : {
        height : 30,
        width: 30,
        backgroundColor : "#fff",
        borderRadius : 12,
        position : 'absolute',
       borderWidth : 1,
        borderColor : "#fff",
        justifyContent : "center",
        alignItems : "center"
    },
    imageView : {
        height : 100,
        width: 90,
        borderRadius : 20,
        margin : 10
    }
    

});