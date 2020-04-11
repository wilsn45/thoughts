import React, { useState } from 'react';
import {View, 
        Image,
        Text,
        TextInput, 
        StyleSheet,
        TouchableOpacity,
        TouchableWithoutFeedback,
         Keyboard,
        KeyboardAvoidingView,
        ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import ImagePicker from 'react-native-image-picker';
import ImageView from "thoughts/app/components/ImageViewComponent";

const options = {
  title: 'Select Image',
   storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};
const DATA = [
  1,
  2,
  3,
  5,
  6,
  7,
  8,
  9,
  10
];
export default function NewThought ({closeCallBack}) {

    
     function onPostClick () {

     }



    return (

    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      
    <View style = {styles.main}>

        <TouchableOpacity
                 style = {{marginLeft : 10,marginTop : 10}}
                 onPress={() => closeCallBack()}>
                 <Icon name={"x"}  size={32}  color={"gray"} style = {{marginTop : 10}}  />
            </TouchableOpacity>

            <ScrollView style = {styles.ScrollView}>
            
               <FlatList
        data={DATA}
        renderItem={({ item }) => <Item title={item.title} />}
        keyExtractor={item => item.id}
      />

            </ScrollView>
     
       </View>
      
    </TouchableWithoutFeedback>
          
    );
};


const styles = StyleSheet.create({
    main : {
        flex : 0.9,
        width: '100%',
        backgroundColor : "#fff"
    },
    ScrollView : {
       flex : 1,
        marginTop : 10,
        width : '100%',
        borderColor: "pink",
       //borderWidth : 1
    },
    optionsView : {
      flexDirection : "row",
      height : 40,
      width : 200,
      borderBottomWidth : 1,
      borderColor: '#F0F0F0',

    }
    


});