import React, { useState } from 'react';
import {View, 
        Text,
        FlatList,
        StyleSheet,
        TouchableOpacity,
        ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import ImagePicker from 'react-native-image-picker';
import ImageView from "thoughts/app/components/ImageViewComponent";
import { Flag } from 'react-native-svg-flagkit'
import {CountryCodeList} from "thoughts/app/storage/Local/CountryCodeList";


export default function CountryCode ({selectCountryCallback}) {

    return (

    <View style = {styles.main}>

          <FlatList
               data={CountryCodeList.sort((a, b) => a.code.localeCompare(b.code))}
                renderItem={({ item }) => <TouchableOpacity style = {styles.optionsView}
                                       onPress={() => selectCountryCallback(item.dial_code,item.code)}>
                                       <Text style = {{fontSize : 20, marginLeft : 10, width : 80, marginRight : 20
                                          }}>{item.code + " " + item.dial_code}</Text>
                                          <View style = {{marginLeft : 20 }}>
                                          <Flag 
                                             id={item.code}
                                             size={0.2}
                                          />
                                          </View>
                                      </TouchableOpacity> }
                   keyExtractor={item => item.code}
           />

       </View>
      
    );
};


const styles = StyleSheet.create({
    main : {
        flex : 0.7,
        width: '100%',
        backgroundColor : "#fff"
    },
    optionsView : {
      flexDirection : "row",
      height : 40,
      width : 200,
      borderBottomWidth : 1,
      borderColor: '#F0F0F0',
      marginTop : 20,


    }
    


});