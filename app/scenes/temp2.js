import React, { useState } from 'react';
import {View,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity} from 'react-native';

import * as api from ".././services/auth";
import { useAuth } from ".././provider";

import Icon from 'react-native-vector-icons/Feather';
//import {Header, ErrorText} from "../../components/Shared";

export default function GetStarted() {
    
    //1 - DECLARE VARIABLES
    const [phoneShow, setPhoneShow] = useState(true);
    const [otcShow, setOtcShow] = useState(false);
   

    const [error, setError] = useState(null);
    const [message, setMessage] = useState("A 4 digit OTP will be sent via SMS to verify your number");
    const [buttonText, setButtonText] = useState("Get Started");
    const [buttonEnabled, setButtonEnabled] = useState(true);
    


    const [phoneNumber, setPhoneNumber] = useState("");
    const [countryCode, setCountryCode] = useState("+1");
   


   

    phoneNumberCallback = (value) => {
        setPhoneNumber(value)
        console.log(phoneNumber)
        if (phoneNumber.length >7) {
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

   

    async function  onClick() {
        //setOtcShow(true)
        //setPhoneShow(false)
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

        <View style = {styles.main} >

        	<View style = {styles.center}>

        	<View style = {styles.textView}>
        		<Text style={styles.welcomeText}>Welcome to </Text>
        		<Text style={styles.thoughtsText}>thoughts</Text>
			</View>
			{ phoneShow && 
				 <View style = {styles.phone}>
				  <View style = {styles.phoneCodeView}>
			 		<TextInput style={styles.phoneCodeTextView}
			 	 	 keyboardType =  "phone-pad"
                 	 maxLength={4}
                 	 onChangeText={(txt) => setCountryCode(txt)}
     			 	 value={countryCode}
			 	 	 />
			   	</View>
			 		 <TextInput style={styles.phoneNumberTextView}
			 	 	 keyboardType = "phone-pad"
                 	 maxLength={10}
			 	 	 />
				</View>
			}
			{ otcShow && 
				<View style = {styles.otc}> 
					<View style = {styles.otcIconView}>
					 <Icon name={'lock'}  size={25} />
			 		</View>
			 			<TextInput style={styles.phoneNumberTextView}
			 	  		keyboardType = "phone-pad"
                 		 maxLength={4}
			 	  		/>
					</View>
			}

			<Text style= { error ? styles.errorText : styles.messageText}> 
				{message}
        	</Text>


        	<TouchableOpacity
                 style={ 
                         buttonEnabled ? styles.buttonEnabledView : styles.buttonDisabledView 
                        }
                 onPress={() => onClick()}
                 underlayColor='#fff'
                 disabled={!buttonEnabled}>
                <Text style={styles.buttonText}>{buttonText}</Text>
               </TouchableOpacity>


        	</View>
            
        </View>
    );
};

const styles = StyleSheet.create({ 
	main : {
        flex : 1,
        alignItems : "center",
        justifyContent : "center",
        flexDirection: 'row'
    },
	center : {
		flex : 0.9,
		height : '30%',
		alignSelf: 'center',
        flexDirection: 'column'
    },
    
    textView : {
    	flexDirection: 'row',
    	alignItems : "flex-end",
    },
    welcomeText : {
        fontSize: 32,
        fontFamily: "Thonburi",
        color : "#5a5e5e",
    },
	thoughtsText : {
		fontSize: 32,
        fontFamily: "Thonburi",
        color : "#024a57",
    },
    phone : {
    	marginTop : 40,
    	height : 50,
    	width : '90%',
    	flexDirection: 'row',
		borderColor: '#F0F0F0',
		borderWidth : 2,
		borderRadius: 5,

    },
    phoneCodeView : {
    	backgroundColor : "#F0F0F0",
    	flex: 0.2,
    	height : '100%',
    	borderColor : '#F0F0F0',
    	borderRightWidth : 1,
    	
    	justifyContent : "center",

    },
    phoneCodeTextView : {
    	color : 'black',
    	fontSize: 19,   
    	marginLeft: 10,
    	marginRight: 10,
    },
    phoneNumberTextView : {
    	flex: 0.8,
    	height : '100%',
    	color : 'black',
    	fontSize: 25,   
    	marginLeft: 10
    },

    otc : {
    	height : 50,
    	marginTop : 90,
    	width : '90%',
    	flexDirection: 'row',
		borderColor: '#F0F0F0',
		borderWidth : 2,
		borderRadius: 5,
		position:'absolute',
    },
    otcIconView : {
    	marginLeft: 20,
    	marginRight: 10,
    	flex: 0.15,
    	borderColor : 'grey',
    	borderRightWidth : 1,
    	justifyContent : "center"
    },
    otcTextInputView : {
    	flex: 0.8,
    	height : '100%',
    	marginLeft: 10
    },
    messageText : {
    	margin: 10,
    	marginRight : 25,
    	fontSize: 13,
        fontFamily: "Thonburi",
        color : "#5a5e5e",
    },
     errorText : {
     	margin: 10,
    	marginRight : 25,
    	fontSize: 13,
        fontFamily: "Thonburi",
        color : "red",
    },

    buttonEnabledView: {
    	marginTop : 30,
        width : '60%',
        height : 50,
        backgroundColor:'#024a57',
        borderRadius:5,
        justifyContent:  "center",
        alignSelf: "center"
    },
	buttonDisabledView: {
		marginTop : 30,
        width : '60%',
        height : 50,
        backgroundColor:'#63b1bf',
        borderRadius:5,
        borderWidth: 0,
        justifyContent:  "center",
        alignSelf: "center"
     },

     buttonText: {
      color:'#fff',
      textAlign:'center',
      fontSize: 25,
      fontFamily: "Thonburi",
    }
	
    
});

GetStarted.navigationOptions = ({}) => {
    return {
        title: ``
    }
};