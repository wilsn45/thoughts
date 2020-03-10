import React, { useState } from 'react';
import {View, Text,Image, StyleSheet} from 'react-native';

export default function CuisineListView({ name,image }) {
  return (
    <View style = {styles.container}>
		<Image source = {image} style = {styles.image}/>
		<Text style = {styles.text}> {name} </Text>

	</View>
  );
};


const styles = StyleSheet.create ({

	container : {
		flexDirection: "column",
		flex : 1,
		marginRight: 30
	},
	image : {
		width : 100,
		height: 100,
		borderRadius : 50
	},
	text : {
		fontSize : 15,
		textAlign : "center"
	}
});