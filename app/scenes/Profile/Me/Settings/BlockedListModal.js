import React, { useState,useEffect } from 'react';
import {View,
        Image,
        StyleSheet,
        TouchableOpacity,
        FlatList,
        Text} from 'react-native';
import UserBlockedCell  from "./UserBlockedCell";
import Icon from 'react-native-vector-icons/Feather';
import * as realm from "thoughts/app/storage/Realm/ProfileRealm";
import * as api from "thoughts/app/services/ProfileServices";
var Spinner = require('react-native-spinkit');

export default function BlockedListModal ({closeCallBackBlock}) {
  const[isLoading, setIsLoading] = useState(true);
  const[userList, setUserList] = useState(null);
  const[title, setTitle] = useState("");
  let selectedList = []


  useEffect(() => {
    setTitle("Blocked")
    getUserList()
  }, []);

  async function getUserList() {
    try {
      let profileData =  await realm.getProfileData()
      let list = profileData.blocked
      setUserList(list)
    }
    catch(err) {
      console.log("error is "+err)
    }
  }


async function unblockUser(uid) {
  try {
    console.log("unblock this one "+uid)
    await api.unblock(uid)
    let tmpBlock = userList.filter( obj =>  {
      return obj.uid !== uid;
    });
    if(tmpBlock.length<1) {
      closeCallBackBlock()
    }
    setUserList(tmpBlock)
  }
  catch(err) {
    console.log("unblockUser error is "+err)
  }
}


return (

  <View style = {styles.main}>

  { userList &&
    <View style = {styles.superView}>
      <View style = {styles.headerView}>
      <TouchableOpacity
               style = {{marginLeft : 10,marginTop : 10,flex : 0.5}}
               onPress={() => closeCallBackBlock()}>
               <Icon name={"x"}  size={28}  color={"gray"}   />
          </TouchableOpacity>

          <Text style = {styles.topText}> {title} </Text>
        </View>

        <View style={styles.tableView}>
          <FlatList
            data={userList}
            renderItem={({ item }) => <UserBlockedCell user={item} unblockCallback={unblockUser} />}
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
