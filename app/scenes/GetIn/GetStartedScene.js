import React, { useState, useEffect } from 'react';
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
import * as RNLocalize from "react-native-localize";
import {CountryCodeList} from "thoughts/app/storage/Local/CountryCodeList";


export default function GetStarted(props) {
     const {navigation} = props;
     const {navigate} = navigation;
    
    //1 - DECLARE VARIABLES
    const [confirmation, setConfirmation] = useState(null);
    const [selectCountryCode, setSelectCountryCode] = useState(false);
    const [otcView, setOtcView] = useState(false);

    const [error, setError] = useState(null);
    const [message, setMessage] = useState("A six digit otp will be sent on your number");

    const [buttonText, setButtonText] = useState("Get Started");
    const [buttonEnabled, setButtonEnabled] = useState(true);
    
    const [phoneNumber, setPhoneNumber] = useState("");
    const [dial_code, setDialCode] = useState("+91");
    const [countryCode, setCountryCode] = useState(null);
    const [otc, setOtc] = useState("");

     const [user, setUser] = useState(null);
   

    useEffect(() => {
        try {
           let country = RNLocalize.getCountry()
            var result = CountryCodeList.find(obj => {
                return obj.code === country
            })
            if (!countryCode) {
            setCountryCode(result.code + " " + result.dial_code)
            setDialCode(result.dial_code)
            } 
        }
        catch(err) {
            console.log("error" + err)
        }
    });

    function validE164(num) {
     return /^\+?[1-9]\d{1,14}$/.test(num)
    }

   
    function showError(message) {
        setError(true);
        setMessage(message)
    }

    function clearError() {
        setError(false);
        if (otcView) {
            setMessage("Enter the opt we just sent you on your number")
        } else {
            setMessage("A six digit otp will be sent on your number")
        }
    }

    function showLoading() {
        setButtonEnabled(false)
        setButtonText("Loading...")
    }

    function selectCountryCallback (dial_code,code) {
       console.log(code)
       setCountryCode(code + " " + dial_code)
       setDialCode(dial_code)
       setSelectCountryCode(false)
     }

     function showOtc() {
        setButtonEnabled(true)
        setOtcView(true)
        setButtonText("Get In")
        setMessage("Enter the opt we just sent you on your number")
        setError(false)
     }
    
   async function sendOtc () {

    try {
        showLoading()
        const number = dial_code+phoneNumber;
        if (!validE164(number)) {
                showError("Please enter valid phone number")
                 hideLoading()
                return;
               
        }
        let phoneNumberPromise = api.numberSignIn(number)
        let confirmation = await phoneNumberPromise
        setConfirmation(confirmation)
        showOtc()
        
     }catch (err) {
        console.log("error" + err)
        setButtonEnabled(true)
        setButtonText("Get Started")
        showError("something went wrong")
    }
    

   }

  async function verifyOtc () {
    try {
        if (otc.length < 6) {
             showError("Invalid one time code")
                 hideLoading()
                return;
               
        }
        showLoading()
        let numberVerifyPromise = api.numberVerify(otc,confirmation)
        let user = await numberVerifyPromise;

      if (user) {
        let uid = JSON.stringify(user.uid)
        let number = JSON.stringify(user.phoneNumber)
        let setUidPromies =  userStorage.setUserToken(uid)
        let setNumberPromies =  userStorage.setUserNumber(number)
        await setUidPromies;
        await setNumberPromies;
        navigate('FirstLogin');
      }
    }
    catch(err) {
        console.log("error" + err)
        setButtonEnabled(true)
        setButtonText("Get In")
        showError("something went wrong")
    }
 }
   
 return (

        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>

        <View style = {styles.main} >

        	<View style = {styles.center}>

        	<Text style={styles.thoughtsText}>Log in</Text>
			
			 <View style = {styles.phone}>
				  <View style>
			 		<TouchableOpacity
                        onPress={() => setSelectCountryCode(true)}
                        disabled={otcView} >
                      <Text style = {styles.countryCodeText} >{countryCode}</Text>
                    </TouchableOpacity>
			    	</View>
			 		 <TextInput style={styles.phoneNumberTextView}
			 	 	 keyboardType = "phone-pad"
                     onChangeText={(value) => { setPhoneNumber(value); clearError()}}
                     placeholder = "Phone Number"
                     editable={!otcView}
                 	 maxLength={10}
			 	 	 />
				</View>
			{ otcView && 
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
            {
                message && 
                <View style={styles.messageView}>
                 <Text style= { error ? styles.errorText : styles.messageText}> 
                     {message}
                </Text>
                </View>
            }
            
			
            <TouchableOpacity
                 style={ 
                         buttonEnabled ? styles.buttonEnabledView : styles.buttonDisabledView 
                        }
                 onPress={() => otcView ? verifyOtc() : sendOtc()}
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
		height : '60%',
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
    	fontSize: 21,   
    	marginRight: 5,
    },
    phoneNumberTextView : {
        marginLeft : 10,
    	flex: 0.8,
    	height : '100%',
    	color : 'black',
    	fontSize: 24,   
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
        height : 60,
        alignSelf : "center"
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
    	width : '70%',
        height : 60,
        backgroundColor:'#fb375b',
        borderRadius:15,
        justifyContent:  "center",
        alignSelf: "center"
    },
	buttonDisabledView: {
		marginTop : 40,
        width : '70%',
        height : 60,
        backgroundColor:'#fb375b',
        borderRadius:15,
        justifyContent:  "center",
        alignSelf: "center",
        opacity : 0.5,
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