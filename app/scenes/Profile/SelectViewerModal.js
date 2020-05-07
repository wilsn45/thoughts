import React, { useState,useEffect } from 'react';
import {View,
        Image,
        StyleSheet,
        TouchableOpacity,
        FlatList,
        Text} from 'react-native';
import UserSelectCell  from "thoughts/app/components/UserSelectCell";
import Icon from 'react-native-vector-icons/Feather';
import * as userStorage from "thoughts/app/storage/Local/UserStorage";
import * as realm from "thoughts/app/storage/Realm/ProfileRealm";

export default function SelectViewerModal ({closeCallBack,modalDoneCallBack,selectionOption}) {
  const[userList, setUserList] = useState(null);
  const[title, setTitle] = useState("");
  const[list, setList] = useState([]);


  useEffect(() => {
    if (selectionOption=="Only") {
      setTitle("Show Only To")
    }else {
      setTitle("Show Except")
    }
    loadList()
  }, []);

  async function loadList () {
    let allList = await realm.getFollowers()
    let selList
    if(selectionOption == "Only") {
      selList = await userStorage.getShowOnly()
    } else if (selectionOption == "Except") {
      selList = await userStorage.getShowExcept()
    } else {
      selList = await userStorage.getHidden()
    }
    setList(selList)
    let selArray = []
    for (index in allList) {
      let user = {
        uid :  allList[index].uid,
        username : allList[index].username,
        isSelected : selList ? selList.includes(allList[index].uid) :false
      }
      selArray.push(user)
    }

    setUserList(selArray)
}

 function makeFinalList() {
   modalDoneCallBack(list)
 }

function cellCallback(uid,isSelected) {

   if(isSelected) {
      let lst  = list
      lst.push(uid)
      setList(lst)
  }
   else {
     let lst  = list.filter((e)=>(e !== uid))
     setList(lst)
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
            renderItem={({ item }) => <UserSelectCell cellCallback = {cellCallback} user={item} selectionOption={selectionOption} />}
            keyExtractor={user => user.username}
          />
        </View>

        <TouchableOpacity
        style={ styles.setButtonView}
        onPress={() => makeFinalList()}
        underlayColor='#fff'>
        <Text style={styles.buttonText}>Done</Text>
        </TouchableOpacity>
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
