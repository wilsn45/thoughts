import React, { useState,useEffect,useRef } from 'react';
import { View,
        StyleSheet,
        Text,
        Image,
        TextInput,
        TouchableOpacity,
        SafeAreaView,
        FlatList } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation, useNavigationParam} from 'react-navigation-hooks'
import * as userStorage from "thoughts/app/storage/Local/UserStorage";
import NewThought from "./NewThoughtModal";
import Modal from 'react-native-modal';
import  * as User  from "thoughts/app/User";
import * as messagesAPI from "thoughts/app/services/MessageServices";
import firestore from '@react-native-firebase/firestore';

export default function HomeScene(props) {
  // let unsubscribe
  const refContainer = useRef(null);
  const [locationViewWidth, setLocationViewWidth] = useState(100);
  const [newThought, showNewThought] = useState(false);
  const [picData, setPicData] = useState(null);
  const { navigate } = useNavigation();
  let messageSubscriber
    toggleDrawer = () => {
        navigation.toggleDrawer()
    }

    closeNewThoughtModal = () => {
        showNewThought(false)
    }

  useEffect(() => {
    userStorage.getUserProfileMinBase64()
    .then(data => {
      setPicData(data)
    })
    .catch(err => {
      console.log("error is " +err)
    })

   messagesAPI.subscribeMessage()
},[]);

async function navigateToProfile() {
  // navigate('MyProfile')
  let unixtime = new Date().valueOf()
  let timestamp = Math.floor(unixtime/1000)

  let messageRef = firestore().collection('messages');
   messageRef.add({
      fromusername : "User A",
      fromuid : "AD9jnDWbPKYPOFD4C355b1ja7bF2",
      tousername : "Kabir",
      touid : "DD9jnDWbPKYPOFD4C355b1ja7bF2",
      message : "Message A 1",
      picRef : null,
      thoughtsTitle : null,
      thoughtsRef : 451,
      at : timestamp,
      delivered : false
    })
    console.log("timestampe "+timestamp)
}

  function navigateToAMessages() {
    navigate('conversationList')
  }

  function sendMessage(uid) {
    console.log("Sending message to "+uid)
  }

  return (

    <View style = {styles.main}>
      <View style = {styles.headerView}>
      <TouchableOpacity
        style = {styles.superViewHeader}
        onPress={() => navigateToProfile()}
        underlayColor='#fff'
       >

       {picData && <Image style={styles.profileView} source={{uri: picData}}/>}
      </TouchableOpacity>

      <TouchableOpacity
        style = {styles.superViewHeader}
        onPress={() => navigateToAMessages()}
        underlayColor='#fff'
       >
       <Icon name={'message-square'}  style = {styles.messageView} size={40} />
      </TouchableOpacity>


      </View>

      <View style = {styles.centerView}>

          <View style = {styles.thoughtView}>
            <Text style = {styles.text}>AD9jnDWbPKYPOFD4C355b1ja7bF2</Text>
            <Text style = {styles.text}>Gautam Budh</Text>
            <View style = {styles.sendView}>
            <TextInput style = {{flex : 0.8, height : 50, marginLeft : 20}}
              placeholder = "Send"/>
              <TouchableOpacity style = {{flex : 0.2, height : 50}}
              onPress={() => sendMessage("AD9jnDWbPKYPOFD4C355b1ja7bF2")}
              >
               <Icon name={'send'}  style = {{alignSelf : "center"}} size={30} />
              </TouchableOpacity>
            </View>

          </View>

          <View style = {styles.thoughtView}>
            <Text style = {styles.text}>BD9jnDWbPKYPOFD4C355b1ja7bF2</Text>
            <Text style = {styles.text}>Isha</Text>
            <View style = {styles.sendView}>
            <TextInput style = {{flex : 0.8, height : 50, marginLeft : 20}}
              placeholder = "Send"/>
              <TouchableOpacity style = {{flex : 0.2, height : 50}}
              onPress={() => sendMessage("BD9jnDWbPKYPOFD4C355b1ja7bF2")}
              >
               <Icon name={'send'}  style = {{alignSelf : "center"}} size={30} />
              </TouchableOpacity>
            </View>
          </View>

          <View style = {styles.thoughtView}>
            <Text style = {styles.text}>CD9jnDWbPKYPOFD4C355b1ja7bF2</Text>
            <Text style = {styles.text}>Daniya</Text>
            <View style = {styles.sendView}>
            <TextInput style = {{flex : 0.8, height : 50, marginLeft : 20}}
              placeholder = "Send"/>
              <TouchableOpacity style = {{flex : 0.2, height : 50}}
              onPress={() => sendMessage("CD9jnDWbPKYPOFD4C355b1ja7bF2")}
              >
               <Icon name={'send'}  style = {{alignSelf : "center"}} size={30} />
              </TouchableOpacity>
            </View>
          </View>

          <View style = {styles.thoughtView}>
            <Text style = {styles.text}>ED9jnDWbPKYPOFD4C355b1ja7bF2</Text>
            <Text style = {styles.text}>Wilson</Text>
            <View style = {styles.sendView}>
            <TextInput style = {{flex : 0.8, height : 50, marginLeft : 20}}
              placeholder = "Send"/>
              <TouchableOpacity style = {{flex : 0.2, height : 50}}
              onPress={() => sendMessage("ED9jnDWbPKYPOFD4C355b1ja7bF2")}
              >
               <Icon name={'send'}  style = {{alignSelf : "center"}} size={30} />
              </TouchableOpacity>
            </View>
          </View>

      </View>


      <View style={styles.bottomView}>

      <TouchableOpacity
        style = {styles.superViewBottom}
        onPress={() => navigateToProfile()}
        underlayColor='#fff'
       >
        <Icon name={'slack'}  style = {styles.slackView} size={50} />
      </TouchableOpacity>

      <TouchableOpacity
        style = {styles.superViewBottom}
        onPress={() => navigateToProfile()}
        underlayColor='#fff'
       >
        <Icon name={'circle'}  style = {styles.thoughtsView} size={80} />
      </TouchableOpacity>

      <TouchableOpacity
        style = {styles.superViewBottom}
        onPress={() => navigateToAMessages()}
        underlayColor='#fff'
       >
       <Icon name={'zap'}  style = {styles.zapView} size={50} />
      </TouchableOpacity>

      </View>


    </View>
    );
}

const styles = StyleSheet.create({

  main : {
      flex : 1,
      alignItems : "center",
      justifyContent : "center",
      backgroundColor : "#fff",
  },
  headerView : {
    flex : 0.1,
    width : '100%',
    marginTop : 40,
    justifyContent : "space-between",
    flexDirection : "row"
  },
  centerView : {
    flex : 0.9,
    width : '100%',
    alignItems : "center",
    justifyContent : "center",
    // borderColor  : "purple",
    // borderWidth : 1,
  },

  thoughtView : {
    flex : 0.3,
    width : '70%',
    borderColor  : "#149cea",
    borderWidth : 1,
    margin : 10,
    justifyContent : 'space-between'
  },
  sendView : {
    alignSelf : "flex-end",
    alignItems : "center",
    justifyContent : "center",
    width : '100%',
    height : '30%',
    flexDirection : 'row',
    borderColor  : "#149cea",
    borderWidth : 1,
  },
  text : {
    fontSize: 15,
    fontFamily: "Thonburi",
    fontWeight : "200",
    margin : 5
  },
  bottomView : {
    flex : 0.1,
    width : '100%',
    marginBottom : 10,
    justifyContent : "space-around",
    flexDirection : "row"
  },
  superViewHeader : {
    marginLeft : 10,
    marginRight : 20,
    width : 50,
    height : 50,
  },
  profileView : {
      width : 50,
      height : 50,
      borderRadius : 25,
      alignSelf : "flex-start"
  },
  messageView : {
      alignSelf : "flex-end"
  },
  superViewBottom : {
    width : 80,
    height : 80,

    // borderColor  : "purple",
    // borderWidth : 1,
  },
  slackView : {
      alignSelf : "flex-start"
  },
  thoughtsView : {
      alignSelf : "center"
  },
  zapView : {
      alignSelf : "flex-end"
  }

});

HomeScene.navigationOptions = ({}) => {
  return {
    title: ``
  }
};





// const unsubscribe = firestore().collection('messages').where("touid", '==', User.uid).onSnapshot(function (querySnapshot) {
//    querySnapshot.forEach(documentSnapshot => {
//     console.log("message is "+documentSnapshot.data().message)
//     console.log("************************")
//   });
// });

// const didFocusEvent = props.navigation.addListener('didFocus', () => {
//     // console.log('focused');
//
// });

//
// const didBlurEvent = props.navigation.addListener('didBlur', () => {
//     console.log('lost focused');
//     refContainer.current = null
// });
