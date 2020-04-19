import React, { useState, useEffect } from 'react';
import {View,
  StyleSheet,
  Text,
  Platform,
  TextInput,
  TouchableOpacity
} from 'react-native';
import * as api from "thoughts/app/services/UserGetInServices";
import { useAuth } from "thoughts/app/provider";
import * as userStorage from "thoughts/app/storage/Local/UserStorage";
import Icon from 'react-native-vector-icons/Feather';
var Spinner = require('react-native-spinkit');



export default function SelectTagScene(props) {
  const {navigation} = props;
  const {navigate} = navigation;


useEffect(() => {

test()
});

async function test() {
  userStorage.setTest()
  let value =  await userStorage.getTest()
   console.log("test value is "+value)
}

return (
  <View style={styles.main}>
   <View style = {styles.middleView}>
   <Text style={styles.thoughtsText}>Select your favourite tags</Text>

   <Text style={styles.belowText}>there are thousands other tags you can select from your profile</Text>

   <TouchableOpacity
          style={ styles.setButtonView}
          onPress={() => setUserInfo()}
          underlayColor='#fff'>
          <Text style={styles.buttonText}>Done</Text>
          </TouchableOpacity>
    </View>
</View>

  );
};

const styles = StyleSheet.create({

  main : {
      flex : 1,
      width : '100%',
      alignItems: 'center',
      justifyContent: 'center',
      borderColor : "green",
      backgroundColor : "#fff",
  },
 middleView : {
    flex : 0.7,
    width : '90%',
    alignItems: 'center',
    justifyContent : 'center',
    borderColor: 'red',
    // borderWidth : 2
  },
  thoughtsText : {
    fontSize: 25,
    fontFamily: "Thonburi",
    fontWeight : "100",
    //textAlign : "auto",
    marginBottom : 30
  },
  belowText : {
    fontSize: 15,
    fontFamily: "Thonburi",
    fontWeight : "100",
    textAlign : "auto",
    marginBottom : 30
  },

  errorText : {
     width : 300,
     fontSize: 19,
     fontFamily: "Thonburi",
     color : "red",
     textAlign:'center',
 },


 setButtonView: {
     marginTop : 40,
     width : '70%',
     height : 60,
     backgroundColor:'#189afd',
     borderRadius:25,
     justifyContent:  "center",
     alignSelf: "center"
 },
 buttonText: {
   color:'#fff',
   textAlign:'center',
   fontSize: 23,
   fontFamily: "Thonburi",
   fontWeight : "100",
 }

});

SelectTagScene.navigationOptions = ({}) => {
  return {
    title: ``
  }
};
//




 ///<Spinner style={styles.spinner}  isVisible={true} size={60} type={"FadingCircleAlt"} color={"#63b1bf"}/>
