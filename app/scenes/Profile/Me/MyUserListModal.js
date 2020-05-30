import React, { useState,useEffect } from 'react';
import {View,
        Image,
        StyleSheet,
        TouchableOpacity,
        FlatList,
        Text} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
var Spinner = require('react-native-spinkit');
import * as realm from "thoughts/app/storage/Realm/ProfileRealm";
import UserCell  from "thoughts/app/components/UserCell";
import  * as User  from "thoughts/app/User";


export default function MyUserList ({closeCallBack,navigateCallBack,showFollowing}) {
  const[userList, setUserList] = useState(null);
  const[title, setTitle] = useState("");

  useEffect(() => {
    if (showFollowing) {
      setTitle("Followings")
    }else {
      setTitle("Followers")
    }
    getUserList()
    }, []);

  async function getUserList() {
    try {
      let profileData =  await realm.getProfileData()
      let list = showFollowing ? profileData.followings : profileData.followers
      setUserList(list)
    }
    catch(err) {
      console.log("error is "+err)
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
               onPress={() => closeCallBack()}>
               <Icon name={"x"}  size={28}  color={"gray"}   />
          </TouchableOpacity>

          <Text style = {styles.topText}> {title} </Text>
        </View>

        <View style={styles.tableView}>
          <FlatList
            data={userList}
            renderItem={({ item }) => <UserCell cellNavigateCallBack = {navigateCallBack} user={item} />}
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
    }

});
