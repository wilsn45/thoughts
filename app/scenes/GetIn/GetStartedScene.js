import React, { useState } from 'react';
import {View,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard} from 'react-native';

import * as api from "thoughts/app/services/UserGetInServices";
import * as userStorage from "thoughts/app/storage/Local/UserStorage";
import { useAuth } from "thoughts/app/provider";
import Icon from 'react-native-vector-icons/Feather';
import CountryCodeModal from "./CountryCodeModal";
import Modal from 'react-native-modal';
import DeviceInfo from 'react-native-device-info';


export default function GetStarted(props) {
     const {navigation} = props;
     const {navigate} = navigation;
    
    //1 - DECLARE VARIABLES
    const [confirmation, setConfirmation] = useState();
    const [selectCountryCode, setSelectCountryCode] = useState(false);


    const [error, setError] = useState(null);
    const [message, setMessage] = useState("To protect you from fake peoples");

    const [buttonText, setButtonText] = useState("Get Started");
    const [buttonEnabled, setButtonEnabled] = useState(true);
    
    const [phoneNumber, setPhoneNumber] = useState("");
    const [dial_code, setDialCode] = useState("+91");
    const [countryCode, setCountryCode] = useState("IN +91");
    const [otc, setOtc] = useState("");
   

    function validE164(num) {
     return /^\+?[1-9]\d{1,14}$/.test(num)
    }

   
    function showError(message) {
        setError(true);
        setMessage(message)
    }

    function clearError() {
        setError(false);
        if (confirmation) {
            setMessage("A 6 digit OTP will be sent via SMS to verify your number")
        }
    }

    function showLoading() {
        setButtonEnabled(false)
        setButtonText("Loading...")
    }

    function hideLoading() {
        setButtonEnabled(true)
        if (confirmation) {
             setButtonText("Get Started")
        }
        else {
            setButtonText("Get In")
        }
       
    }

    function selectCountryCallback (dial_code,code) {
       setCountryCode(code + " " + dial_code)
       setDialCode(dial_code)
       setSelectCountryCode(false)
     }

    
   async function sendOtc () {
    
    setConfirmation("4577")
    // try {
    //     showLoading()
    //     const number = countryCode+phoneNumber;
    //     if (!validE164(number)) {
    //             showError("Please enter valid phone number")
    //             return;
    //             hideLoading()
    //     }
    //     let phoneNumberPromise = api.numberSignIn(number)
    //     if(confirmation) {
    //         console.log("confirmation is" +confirmation)
    //     }
    //     let confirmation = await phoneNumberPromise
    //  }catch (err) {
    //     showError("something went wrong")
    // }
    //   hideLoading()

   }

  async function verifyOtc () {
    try {
        showLoading()
        let numberVerifyPromise = api.numberVerify(otc,confirmation)
        let user = await numberVerifyPromise;

      if (user) {
        console.log("user data is" + user.data())
      }
    }
    catch(err) {
        showError("something went wrong")
    }
    hideLoading()
    



      // userStorage.setUserToken("DaniKhanWedsWilson")
      // userStorage.setUserNumber("9958565727")
      // navigate('FirstLogin');
        // showLoading()
        // await api.numberVerify(otc).then( (user) => {
        //     console.log("user is " + user)
        // }).catch (err => {
        //     hideLoading()
        //     showError("something went wrong")
        // })
 }
   
 return (

        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>

        <View style = {styles.main} >

        	<View style = {styles.center}>

        	<Text style={styles.thoughtsText}>Log in</Text>
			
			 <View style = {styles.phone}>
				  <View style>
			 		<TouchableOpacity
                        onPress={() => setSelectCountryCode(true)}>
                      <Text style = {styles.countryCodeText} >{countryCode}</Text>
                    </TouchableOpacity>
			    	</View>
			 		 <TextInput style={styles.phoneNumberTextView}
			 	 	 keyboardType = "phone-pad"
                     onChangeText={(value) => { setPhoneNumber(value); clearError()}}
                     placeholder = "Phone Number"
                 	 maxLength={10}
			 	 	 />
				</View>
			{ confirmation && 
				<View style = {styles.otc}> 
					<View style = {styles.otcIconView}>
					 <Icon name={'lock'}  size={25} />
			 		</View>
			 			<TextInput style={styles.phoneNumberTextView}
			 	  		keyboardType = "phone-pad"
                         onChangeText={(value) => {setOtc(value); clearError();}}
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
                 onPress={() => confirmation ? verifyOtc() : sendOtc()}
                 underlayColor='#fff'
                 disabled={!buttonEnabled}>
                <Text style={styles.buttonText}>{buttonText}</Text>
               </TouchableOpacity>


        	</View>

            <Modal isVisible={selectCountryCode} swipeArea={50} style = {{width: 200}} >
                <CountryCodeModal  selectCountryCallback = {selectCountryCallback}/>
             </Modal>
            
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
        fontWeight : "400"
    },
    phone : {
    	marginTop : 50,
    	height : 60,
    	width : '80%',
    	flexDirection: 'row',
		borderColor: '#F0F0F0',
		borderBottomWidth : 2,
		borderRadius: 1,
        justifyContent : "center",
        alignItems : "center",
    },
    countryCodeText : {
        color : 'black',
        fontSize: 20,  
        fontWeight : "200" 
    },
    phoneCodeTextView : {
    	color : 'black',
    	fontSize: 20,   
    	marginRight: 5,
    },
    phoneNumberTextView : {
        marginLeft : 5,
    	flex: 0.8,
    	height : '100%',
    	color : 'black',
    	fontSize: 25,   
    },

    otc : {
    	height : 60,
    	marginTop : 30,
    	width : '80%',
    	flexDirection: 'row',
		borderColor: '#F0F0F0',
		borderBottomWidth : 2,
		borderRadius: 15,
	},
    otcIconView : {
    	marginLeft: 20,
    	marginRight: 10,
    	flex: 0.15,
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
    	width : '70%',
        height : 60,
        backgroundColor:'#fb375b',
        borderRadius:15,
        justifyContent:  "center",
        alignSelf: "center"
    },
	buttonDisabledView: {
		marginTop : 20,
        width : '60%',
        height : 60,
        backgroundColor:'#fb375b',
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