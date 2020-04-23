import React, { useState,useEffect } from 'react';
import {View,
        Image,
        StyleSheet,
        TouchableOpacity,
        FlatList,
        Text} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
var Spinner = require('react-native-spinkit');
import * as api from "thoughts/app/services/ProfileServices";
import UserCell  from "thoughts/app/components/UserCell";


export default function UserList ({closeCallBack,username,showFollowing}) {
  const[isLoading, setIsLoading] = useState(true);
  const[userList, setUserList] = useState(null);


  useEffect(() => {
    getUserList()
    }, []);

  async function getUserList() {
    try {
      let userListPromise =  api.getUserList(username,showFollowing)
      let list = await userListPromise
      let dicArray = getUserDictArray(list)
      console.log("dicArray is"+dicArray)
      setUserList(dicArray)
    }
    catch(err) {
      console.log("error is "+err)
    }
    setIsLoading(false)
  }

  function getUserDictArray(userList) {
    let dicArray = []
     for (var user in userList) {
       let dic = {
         username : user,
         profileURL : userList[user]
       }
      dicArray.push(dic)
    }
    return dicArray
  }


return (

  <View style = {styles.main}>
  {
    isLoading &&
    <Spinner  isVisible={true} size={50} type="Arc" color="#189afd"/>
  }
  {
    !isLoading && userList &&
    <View style = {styles.superView}>
      <View style = {styles.headerView}>
      <TouchableOpacity
               style = {{marginLeft : 10,marginTop : 10}}
               onPress={() => closeCallBack()}>
               <Icon name={"x"}  size={32}  color={"gray"} style = {{marginTop : 10}}  />
          </TouchableOpacity>
        </View>

        <View style={styles.tableView}>
          <FlatList
            data={userList}
            renderItem={({ item }) => <UserCell user={item} />}
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
       flex : 0.08,
       width : '100%',
       // borderColor : "#149cea",
       // borderWidth : 2,

    },
    tableView : {
      flex : 0.92,
      alignSelf : "center",
      width : '90%'
    }



});


// <FlatList
//   data={userList}
//   renderItem={({ user }) => <UserCell username={user.username} profileURL = {user.profileURL} />}
//   keyExtractor={user => user.username}
//   />
