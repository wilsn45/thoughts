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
  const[isLoading, setIsLoading] = useState(true);

  const[popularTags, setPopularTags] = useState([])
  const[selectedTags, setSelectedTags] = useState([])
  const[isNavigating, setIsNavigating] = useState(false);


useEffect(() => {
  getMostPopularTags()
});

function getMostPopularTags () {
  if(!isLoading) {
    return;
  }
  api.getMostPopularTags()
  .then(tags => {
    setPopularTags(tags)
     setIsLoading(false)
  })
  .catch(err => {
    console.log("Error is "+err)
    setIsLoading(false)
  })
}

function tagTap(value) {
  if(selectedTags.includes(value)) {
    setSelectedTags(selectedTags.filter((e)=>(e !== value)))
  }else {
    setSelectedTags(
      [... selectedTags, value]
    )
  }
}

async function skipClick() {
  setIsNavigating(true)
  await userStorage.setUserActive()
  await api.addNewUser()
  navigate('App')
}

async function setTagsClick() {
  try {
    setIsNavigating(true)
    await userStorage.setTags(selectedTags)
    await api.addNewUser()
    await userStorage.setUserActive()
    navigate('App')
  }
  catch(err) {
    console.log("error is "+err)
  }

}

return (
  <View style={styles.main}>
  <Text style={styles.selectTagText}>Select your favourite tags</Text>
   <View style = {styles.middleView}>

   {
     isLoading &&
     <Spinner  isVisible={true} size={50} type="Arc" color="#189afd"/>
   }
   {
     !isLoading &&

     <View style = {styles.tagsView}>

     <View style = {styles.tagsHorzView}>

      <TouchableOpacity
        style={ selectedTags.includes(popularTags[0]) ? styles.tagSelectedView : styles.tagView}
        onPress={() => tagTap(popularTags[0])}
       >
        <Text  style={ selectedTags.includes(popularTags[0]) ? styles.tagSelectedText : styles.tagText}> {popularTags[0]} </Text>
       </TouchableOpacity>

      <TouchableOpacity
        style={ selectedTags.includes(popularTags[1]) ? styles.tagSelectedView : styles.tagView}
        onPress={() => tagTap(popularTags[1])}
        >
        <Text  style={ selectedTags.includes(popularTags[1]) ? styles.tagSelectedText : styles.tagText}> {popularTags[1]} </Text>
      </TouchableOpacity>

      </View>

      <View style = {styles.tagsHorzView}>

       <TouchableOpacity
         style={ selectedTags.includes(popularTags[2]) ? styles.tagSelectedView : styles.tagView}
         onPress={() => tagTap(popularTags[2])}
        >
         <Text  style={ selectedTags.includes(popularTags[2]) ? styles.tagSelectedText : styles.tagText}> {popularTags[2]} </Text>
        </TouchableOpacity>

       <TouchableOpacity
         style={ selectedTags.includes(popularTags[3]) ? styles.tagSelectedView : styles.tagView}
         onPress={() => tagTap(popularTags[3])}
         >
         <Text  style={ selectedTags.includes(popularTags[3]) ? styles.tagSelectedText : styles.tagText}> {popularTags[3]} </Text>
       </TouchableOpacity>

       </View>

       <View style = {styles.tagsHorzView}>

        <TouchableOpacity
          style={ selectedTags.includes(popularTags[4]) ? styles.tagSelectedView : styles.tagView}
          onPress={() => tagTap(popularTags[4])}
         >
          <Text  style={ selectedTags.includes(popularTags[4]) ? styles.tagSelectedText : styles.tagText}> {popularTags[4]} </Text>
         </TouchableOpacity>

        <TouchableOpacity
          style={ selectedTags.includes(popularTags[5]) ? styles.tagSelectedView : styles.tagView}
          onPress={() => tagTap(popularTags[5])}
          >
          <Text  style={ selectedTags.includes(popularTags[5]) ? styles.tagSelectedText : styles.tagText}> {popularTags[5]} </Text>
        </TouchableOpacity>

        </View>

        <View style = {styles.tagsHorzView}>

         <TouchableOpacity
           style={ selectedTags.includes(popularTags[6]) ? styles.tagSelectedView : styles.tagView}
           onPress={() => tagTap(popularTags[6])}
          >
           <Text  style={ selectedTags.includes(popularTags[6]) ? styles.tagSelectedText : styles.tagText}> {popularTags[6]} </Text>
          </TouchableOpacity>

         <TouchableOpacity
           style={ selectedTags.includes(popularTags[7]) ? styles.tagSelectedView : styles.tagView}
           onPress={() => tagTap(popularTags[7])}
           >
           <Text  style={ selectedTags.includes(popularTags[7]) ? styles.tagSelectedText : styles.tagText}> {popularTags[7]} </Text>
         </TouchableOpacity>

         </View>

         <View style = {styles.tagsHorzView}>

          <TouchableOpacity
            style={ selectedTags.includes(popularTags[8]) ? styles.tagSelectedView : styles.tagView}
            onPress={() => tagTap(popularTags[8])}
           >
            <Text  style={ selectedTags.includes(popularTags[8]) ? styles.tagSelectedText : styles.tagText}> {popularTags[8]} </Text>
           </TouchableOpacity>

          <TouchableOpacity
            style={ selectedTags.includes(popularTags[9]) ? styles.tagSelectedView : styles.tagView}
            onPress={() => tagTap(popularTags[9])}
            >
            <Text  style={ selectedTags.includes(popularTags[9]) ? styles.tagSelectedText : styles.tagText}> {popularTags[9]} </Text>
          </TouchableOpacity>

          </View>



     <Text style={styles.belowText}>There are thousands other tags you can choose from your profile.</Text>

     {
         isNavigating &&
         <View style = {styles.loadingView}>
         <Spinner style={styles.spinner} isVisible={true} size={50} type="Arc" color="#189afd"/>
         </View>

     }
     {
       !isNavigating &&
       <View>
       <TouchableOpacity
         onPress={() => skipClick()}
         underlayColor='#fff'>
         <Text style={styles.skipText}>SKIP</Text>
         </TouchableOpacity>

        <TouchableOpacity
          style={ styles.setButtonView}
          onPress={() => setTagsClick()}
          underlayColor='#fff'>
          <Text style={styles.buttonText}>Done</Text>
          </TouchableOpacity>
           </View>
     }
     </View>

    }

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
    flex : 0.8,
    width : '90%',
    alignItems: 'center',
    justifyContent : 'center',
    borderColor: 'red',
    // borderWidth : 2
  },
  selectTagText : {
    fontSize: 25,
    fontFamily: "Thonburi",
    fontWeight : "100",
    marginBottom : 30
  },
  tagsView : {
    flex : 1,
    width : '90%',
    justifyContent : "space-between"
  },
  tagsHorzView : {
    flex : 0.18,
    width : '100%',
    flexDirection : "row",
    justifyContent : "space-between"
  },
  belowText : {
    fontSize: 15,
    fontFamily: "Thonburi",
    fontWeight : "100",
    textAlign : "auto",
    marginTop : 20,
    marginBottom : 10
  },
 setButtonView: {
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
 },
 skipText: {
   color:'grey',
   textAlign:'center',
   fontSize: 20,
   fontFamily: "Thonburi",
   fontWeight : "100",
   marginBottom : 15
 },

 tagView : {
   width : '48%',
   height : '100%',
   alignItems: 'center',
   justifyContent: 'center',
   borderColor: '#149cea',
   borderWidth : 1,
   borderRadius : 10,


 },
 tagSelectedView : {
   width : '48%',
   height : '100%',
   alignItems: 'center',
   justifyContent: 'center',
   backgroundColor: '#149cea',
   borderColor: '#149cea',
   borderWidth : 1,
   borderRadius : 10,
 },
 tagText : {
   fontSize: 19,
   fontFamily: "Thonburi",
   color : '#149cea',
 },
 tagSelectedText : {
   fontSize: 19,
   fontFamily: "Thonburi",
   color : '#fff',
 },
 loadingView: {
   marginTop : 40,
   width : '70%',
   height : 60,
   // borderColor : "#189afd",
   // borderWidth : 1,
   // borderRadius:15,
   justifyContent:  "center",
   alignSelf: "center",
   alignItems : "center"
 },

});

SelectTagScene.navigationOptions = ({}) => {
  return {
    title: ``
  }
};
//




 ///<Spinner style={styles.spinner}  isVisible={true} size={60} type={"FadingCircleAlt"} color={"#63b1bf"}/>
