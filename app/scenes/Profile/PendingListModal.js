import React, { useState,useEffect } from 'react';
import {View,
        Image,
        StyleSheet,
        TouchableOpacity,
        FlatList,
        Text} from 'react-native';
import UserPendingCell  from "thoughts/app/components/UserPendingCell";
import Icon from 'react-native-vector-icons/Feather';
import * as realm from "thoughts/app/storage/Realm/Realm";
import * as api from "thoughts/app/services/ProfileServices";
var Spinner = require('react-native-spinkit');

export default function PendingListModal ({closeCallBackPending}) {
  const[isLoading, setIsLoading] = useState(true);
  const[userList, setUserList] = useState(null);
  const[title, setTitle] = useState("");
  let selectedList = []


  useEffect(() => {
    setTitle("Pending Requests")
    loadList()
  }, []);

  async function loadList () {

    let userListPromise =  api.getPendingRequests()
    let list = await userListPromise
    let dicArray = getUserDictArray(list)
    setUserList(dicArray)
    setIsLoading(false)
}

function getUserDictArray(userList) {
  let dicArray = []
   for (var user in userList) {
     let dic = {
       uid : user,
       username : userList[user]
     }
    dicArray.push(dic)
  }
  return dicArray
}

function rejectRequest(uid) {
  try {
    api.rejectRequest(uid)
    let tmpPnd = []
    let pendings = userList
    for (index in pendings) {
      if(pendings[index].uid != uid) {
        tmpPnd.push(pendings[index])
      }
    }
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
    let tmpPnd = []
    let pendings = userList
    for (index in pendings) {
      if(pendings[index].uid != uid) {
        tmpPnd.push(pendings[index])
      }
    }
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
    isLoading &&
    <Spinner  isVisible={true} size={50} type="Arc" color="#189afd"/>
  }
  { !isLoading &&
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
