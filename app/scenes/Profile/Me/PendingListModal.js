import React, { useState,useEffect } from 'react';
import {View,
        Image,
        StyleSheet,
        TouchableOpacity,
        FlatList,
        Text} from 'react-native';
import UserPendingCell  from "./UserPendingCell";
import Icon from 'react-native-vector-icons/Feather';
import * as realm from "thoughts/app/storage/Realm/ProfileRealm";
import * as api from "thoughts/app/services/ProfileServices";
var Spinner = require('react-native-spinkit');
import * as  User  from "thoughts/app/User";

export default function PendingListModal ({closeCallBackPending}) {
  const[userList, setUserList] = useState(null);
  const[title, setTitle] = useState("");
  let selectedList = []


  useEffect(() => {
    setTitle("Pending Requests")
    getUserList()
  }, []);

  async function getUserList() {
    try {
      let profileData =  await realm.getProfileData()
      let list = profileData.pendings
      setUserList(list)
    }
    catch(err) {
      console.log("error is "+err)
    }
  }

function rejectRequest(uid) {
  try {
    api.cancelRequest(User.uid,uid)
    let tmpPnd = userList.filter( obj =>  {
      return obj.uid !== uid;
    });
    if(tmpPnd.length<1) {
      closeCallBackPending()
    }
    setUserList(tmpPnd)
  }
  catch(err) {
    console.log("rejectRequest error is "+err)
  }
}

function acceptRequest(uid,username) {
  try {
    console.log("accept this one "+uid)
    api.acceptRequest(uid,username)
    let tmpPnd = userList.filter( obj =>  {
      return obj.uid !== uid;
    });
    if(tmpPnd.length<1) {
      closeCallBackPending()
    }
    setUserList(tmpPnd)
  }
  catch(err) {
    console.log("acceptRequest error is "+err)
  }
}


return (

  <View style = {styles.main}>
  {
     userList &&
    <View style = {styles.superView}>
      <View style = {styles.headerView}>
      <TouchableOpacity
               style = {{marginLeft : 10,marginTop : 10,flex : 0.5}}
               onPress={() => closeCallBackPending()}>
               <Icon name={"x"}  size={28}  color={"gray"}   />
          </TouchableOpacity>

          <Text style = {styles.topText}> {title} </Text>
        </View>

        <View style={styles.tableView}>
          <FlatList
            data={userList}
            renderItem={({ item }) => <UserPendingCell user={item} acceptCallBack={acceptRequest}  rejectCallBack = {rejectRequest}/>}
            keyExtractor={user => user.username}
          />
        </View>
      </View>
  }


  </View>
   );
};


const styles = StyleSheet.create({
    main : {
      flex : 0.95,
      alignItems : "center",
      justifyContent : "center",
      backgroundColor : "#fff",

    },
    superView : {
      flex : 1,
      width : '100%',
      justifyContent : "center",
      backgroundColor : "#fff",
    },
    headerView : {
       flex : 0.07,
       width : '100%',
       flexDirection : 'row',
       // borderColor : "#149cea",
       // borderWidth : 2,

    },
    tableView : {
      flex : 0.93,
      alignSelf : "center",
      width : '95%',
      marginTop : 25
     //  borderColor : "#149cea",
     // borderWidth : 2,
    },
    topText  : {
        fontSize: 20,
        fontFamily: "Thonburi",
        fontWeight : "100",
        marginTop : 15
    },
    setButtonView: {
        marginTop : 10,
        width : '60%',
        flex : 0.078,
        backgroundColor:'#189afd',
        borderRadius:25,
        justifyContent:  "center",
        alignSelf: "center",
        marginBottom : 20
    },
    buttonText: {
      color:'#fff',
      textAlign:'center',
      fontSize: 23,
      fontFamily: "Thonburi",
      fontWeight : "100",
    },



});


// <FlatList
//   data={userList}
//   renderItem={({ user }) => <UserCell username={user.username} profileURL = {user.profileURL} />}
//   keyExtractor={user => user.username}
//   />
