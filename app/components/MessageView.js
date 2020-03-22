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
		borderWidth : 1,
		borderColor : "#91cbed",
		borderRadius : 20,
		backgroundColor : "#91cbed",
		marginBottom : 10,
		maxWidth:250,
	},
	text : {
		fontSize : 20,
		margin: 10,
	},
	containerSend : {
		flexDirection: "column",
		flex : 1,
		alignSelf : "flex-end",
		borderWidth : 1,
		borderColor : "#e6e6e6",
		borderRadius : 20,
		backgroundColor : "#e6e6e6",
		marginBottom : 10,
		maxWidth:200
		
	}
	
});