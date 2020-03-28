import React, { useState } from 'react';
import {View,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard} from 'react-native';

import * as api from ".././services/auth";
import { useAuth } from ".././provider";
import Icon from 'react-native-vector-icons/Feather';


export default function GetStarted(props) {
     const {navigation} = props;
     const {navigate} = navigation;
    
    //1 - DECLARE VARIABLES
    const [isFirstStep, setFirstStep] = useState(true)
   

    const [error, setError] = useState(null);
    const [message, setMessage] = useState("A 6 digit OTP will be sent via SMS to verify your number");

    const [buttonText, setButtonText] = useState("Get Started");
    const [buttonEnabled, setButtonEnabled] = useState(true);
    
    const [phoneNumber, setPhoneNumber] = useState("");
    const [countryCode, setCountryCode] = useState("+1");
    const [otc, setOtc] = useState("");
   

    function validE164(num) {
     return /^\+?[1-9]\d{1,14}$/.test(num)
    }

   

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

    function showError(message) {
        setError(true);
        setMessage(message)
    }

    function clearError() {
        setError(false);
        if (isFirstStep) {
            setMessage("A 6 digit OTP will be sent via SMS to verify your number")
        }
    }

    function showLoading() {
        setButtonEnabled(false)
        setButtonText("Loading...")
    }

    function hideLoading() {
        setButtonEnabled(true)
        if (isFirstStep) {
             setButtonText("Get Started")
        }
        else {
            setButtonText("Get In")
        }
       
    }

    function onValueChanged(value) {
        if (isFirstStep) {
            clearError()
            setPhoneNumber(value)
        }
        else {
            clearError()
            setOtc(value)
        }
    }

    function showOtCView() {
        setFirstStep(false)
        setMessage("Please enter the one time password")
    }
   

   async function onClick() {
     showLoading()
     try {
         if (isFirstStep) {
               const number = countryCode+phoneNumber;
                if (!validE164(number)) {
                  showError("Please enter valid phone number")
                  return;
                }
               await api.phoneNumberSignin(number);
               showOtCView()
               hideLoading()
          }
        else {
            await api.phoneNumberSignin(otc);
             navigate('App');
        }
     }
     catch (error){
        showError("Something went wrong")
     }
          
    }


    return (

        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>

        <View style = {styles.main} >

        	<View style = {styles.center}>

        	<Text style={styles.thoughtsText}>thoughts</Text>
			
			{ isFirstStep && 
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
                     onChangeText={(value) => onValueChanged(value)}
                     placeholder = "Phone Number"
                 	 maxLength={10}
			 	 	 />
				</View>
			}
			{ !isFirstStep && 
				<View style = {styles.otc}> 
					<View style = {styles.otcIconView}>
					 <Icon name={'lock'}  size={25} />
			 		</View>
			 			<TextInput style={styles.phoneNumberTextView}
			 	  		keyboardType = "phone-pad"
                        onChangeText={(value) => onValueChanged(value)}
                 		 maxLength={6}
			 	  		/>
					</View>
			}
            
            <View style={styles.messageView}>
              <Text style= { error ? styles.errorText : styles.messageText}> 
                {message}
              </Text>
            </View>
			
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

        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({ 
	main : {
        flex : 1,
        alignItems : "center",
        justifyContent : "center",
        flexDirection: 'row',
        backgroundColor : "#fff",

    },
	center : {
		flex : 0.9,
		height : '50%',
		alignSelf: 'center',
        flexDirection: 'column',
        alignItems : "center",
    },
    thoughtsText : {
        fontSize: 38,
        fontFamily: "Thonburi",
        color : "#024a57",
        fontWeight : "bold"
    },
    phone : {
    	marginTop : 70,
    	height : 60,
    	width : '80%',
    	flexDirection: 'row',
		borderColor: '#F0F0F0',
		borderWidth : 2,
		borderRadius: 15,
    },
    phoneCodeView : {
    	flex: 0.2,
    	height : '100%',
    	borderColor : 'grey',
        borderRightWidth : 1,
    	justifyContent : "center",

    },
    phoneCodeTextView : {
    	color : 'black',
    	fontSize: 20,   
    	marginLeft: 10,
    	marginRight: 5,
    },
    phoneNumberTextView : {
    	flex: 0.8,
    	height : '100%',
    	color : 'black',
    	fontSize: 25,   
    	marginLeft: 10
    },

    otc : {
    	height : 60,
    	marginTop : 70,
    	width : '80%',
    	flexDirection: 'row',
		borderColor: '#F0F0F0',
		borderWidth : 2,
		borderRadius: 15,
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
    messageView : {
        marginTop : 20,
        width : 250,
        height : 50,
    },
    messageText : {
        width : 250,
    	fontSize: 14,
        fontFamily: "Thonburi",
        color : "#5a5e5e",
    },
     errorText : {
        width : 250,
        fontSize: 14,
        fontFamily: "Thonburi",
        color : "red",
    },


    buttonEnabledView: {
    	marginTop : 40,
        width : '60%',
        height : 60,
        backgroundColor:'#63b1bf',
        borderRadius:25,
        justifyContent:  "center",
        alignSelf: "center"
    },
	buttonDisabledView: {
		marginTop : 40,
        width : '60%',
        height : 60,
        backgroundColor:'#63b1bf',
        opacity : 0.5,
        borderRadius:25,
        justifyContent:  "center",
        alignSelf: "center"
     },

     buttonText: {
      color:'#fff',
      textAlign:'center',
      fontSize: 23,
      fontFamily: "Thonburi",
      fontWeight : "bold"
    }
	
    
});

GetStarted.navigationOptions = ({}) => {
    return {
        title: ``
    }
};