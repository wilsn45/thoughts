import React, { useState } from 'react';
import {View,
    StyleSheet,
    Text,
    TouchableOpacity,
    TextInput,
	FlatList } from 'react-native';

import * as api from ".././services/auth";
import { useAuth } from ".././provider";

import {KeyboardAvoidingView} from 'react-native'
import Icon from 'react-native-vector-icons/Feather';
import {MessageList} from '../storage/data/MessageList';
import MessageView from '../components/MessageView';


export default function GetStarted() {


    
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
    };

   

   

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

        <View style={styles.main}>
            <View style = {styles.headerView}>
            </View>
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>

              <View style = {styles.chatView}>
              
                <FlatList  style = {styles.chatFlatList}
         		 data={MessageList}
          		  renderItem={({ item }) => <MessageView msg={item.msg} isSend = {item.isSend} />}
      				  keyExtractor={item => item.msg}
     			 />

              </View>

              <View style = {styles.sendView}>
                 <TextInput style={styles.textViewNumber} />
                <Icon name= "send" size={30} color= "black" style = {{marginTop: 5, marginLeft : 5}} />
              </View>
  
            </KeyboardAvoidingView>
        </View>
    );
};

const styles = StyleSheet.create({ 

    main : {
        flex : 1,
        flexDirection : "column",
        alignItems : "flex-start",
        justifyContent : "flex-start",
        width: '100%',
    },
    
    headerView : {
        height : 40,
        width: '90%', 
        marginTop : 40,
        borderRadius : 10,
        borderColor : "black",
        borderWidth : 1,
        alignSelf : "center"
    },
    container : {
        flex : 0.97,
        width: '100%', 
    },
    sendView : {
        height : 45,
        width: '95%', 
        borderColor : "grey",
        borderWidth : 1,
        borderRadius : 20,
        margin : 10,
        alignSelf : "center",
        flexDirection : "row",
    },
    
    textViewNumber: {
       width: '85%',
       height : 45,
       fontSize : 20,
       paddingLeft : 10
    },
    chatView : {
        flex : 1,
        margin : 10
     },
    chatFlatList: {
    	width : '100%',
    	flexDirection : "column-reverse",

    }
    

});

GetStarted.navigationOptions = ({}) => {
    return {
        title: ``
    }
};