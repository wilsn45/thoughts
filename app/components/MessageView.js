import React, { useState } from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function MessageView({ msg, isSend }) {
  return (
    <View style = {isSend ? styles.containerSend :  styles.containerReceived}>
		<Text style = {styles.text}> {msg} </Text>

	</View>
  );
};


const styles = StyleSheet.create ({

	containerReceived : {
		flexDirection: "column",
		flex : 1,
		alignSelf : "flex-start",
		
	},
	text : {
		fontSize : 20,
		margin : 10,
		backgroundColor : "red",
		width : 200,
		borderWidth : 1,
		borderColor : "black",
		borderRadius : 20,
	},
	containerSend : {
		flexDirection: "column",
		flex : 1,
		alignSelf : "flex-end",
		
	}
	
});