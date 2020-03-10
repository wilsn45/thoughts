import React, { useState } from 'react';
import {View,
    StyleSheet,
    Text,
    TouchableOpacity} from 'react-native';

import * as api from ".././services/auth";
import { useAuth } from ".././provider";

import AuthInputField from ".././components/AuthInputField";
//import {Header, ErrorText} from "../../components/Shared";

export default function GetIn() {
    
    //1 - DECLARE VARIABLES
    const [buttonEnabled, setButtonEnabled] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);


    const [phoneNumber, setPhoneNumber] = useState("");
    const [otc, setOtc] = useState("");


    const [otcShow, setOtcShow] = useState(false);

    phoneNumberCallback = (value) => {
        setPhoneNumber(value)
        console.log(phoneNumber)
        if (phoneNumber.length == 9) {
            setButtonEnabled (true)

        }
        else {
            setButtonEnabled (false)
        }
    }

    otcCallback = (value) => {
        setOtc(value)
        if (otc.length == 3) {
            setButtonEnabled (true)

        }
        else {
            setButtonEnabled (false)
        }
    }

   

    async function  onGetStartedClicked() {
        setOtcShow(true)
        setButtonEnabled (false)
        console.log(phoneNumber)

        // try {
        //     const confirmation = await api.passPhoneNumber(phoneNumber);
        //      console.log(confirmation)
        //     setOtcShow(true)
        //     setButtonEnabled (false)

        // } catch (error) {
        //      console.log('error is' + error.message )
        //     setError(error.message);
        //     setLoading(false)
        // }
    }


    return (

        <View style={{flex: 1, paddingHorizontal: 16, backgroundColor:"#fff"}}>
            <View style={styles.main}>
                
               <View style = {styles.textView}> 
                <Text style={styles.letsText}> thoughts</Text>
               </View> 
             

               <AuthInputField type="phone" updateValueCallback = {phoneNumberCallback} isEnable = {!otcShow}/>

               { otcShow &&  <AuthInputField type="otc" updateValueCallback = {otcCallback} isEnable={true}/>}
               

               { !otcShow && <TouchableOpacity
                 style={ 
                         buttonEnabled ? styles.buttonPhoneEnabledView : styles.buttonPhoneDisabledView 
                        }
                 onPress={() => onGetStartedClicked()}
                 underlayColor='#fff'
                 disabled={!buttonEnabled}>
                <Text style={styles.buttonText}>Get Started</Text>
                </TouchableOpacity> }
               
               { otcShow && <TouchableOpacity
                 style= { 
                         buttonEnabled ? styles.buttonOtcEnabledView : styles.buttonOtcDisabledView 
                        }
                 onPress={() => onGetClicked()}
                 underlayColor='#fff'
                 disabled={!buttonEnabled}>
                <Text style={styles.buttonText}>Get In</Text>
                </TouchableOpacity> }
            </View>
        </View>
    );
};

const styles = StyleSheet.create({ 

    main : {
        flex : 0.8,
        marginTop: 160,
        borderColor: "black",
        // b orderWidth : 1,
        alignItems: 'center'
    },

    textView : {
        marginTop : 50,
        flexDirection: "row",
        marginBottom : 20
    },

    letsText : {
        fontSize: 40,
        fontFamily: "Thonburi",
        marginBottom: 20,
        color : "#5a5e5e",
        alignSelf : "flex-end",
    },

    buttonPhoneEnabledView: {
        marginTop :320,
        width : 200,
        height : 50,
        backgroundColor:'#779997',
        borderRadius:25,
        borderWidth: 0,
        justifyContent:  "center",
        position:'absolute'
    },

    buttonPhoneDisabledView: {
        marginTop :320,
        width : 200,
        height : 50,
        backgroundColor:'#8fbebb',
        borderRadius:25,
        borderWidth: 0,
        justifyContent:  "center",
        position:'absolute',
     },

    buttonOtcEnabledView: {
        marginTop :385,
        width : 150,
        height : 50,
        backgroundColor:'#779997',
        borderRadius:25,
        borderWidth: 0,
        justifyContent:  "center",
        position:'absolute'
    },

    buttonOtcDisabledView: {
        marginTop :385,
        width : 150,
        height : 50,
        backgroundColor:'#8fbebb',
        borderRadius:25,
        borderWidth: 0,
        justifyContent:  "center",
        position:'absolute',

    },

    buttonText: {
      color:'#fff',
      textAlign:'center',
      fontSize: 25,
      fontFamily: "Thonburi",
    }
});

GetIn.navigationOptions = ({}) => {
    return {
        title: ``
    }
};