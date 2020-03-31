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
import ImageView from "../../components/ImageView";

const options = {
  title: 'Select Image',
   storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

export default function NewThought ({closeCallBack}) {

    const [desc, setDesc] = useState("")

    const [locationFlag, setLocationFlag] = useState(false)
    
    const [optionFlag, setOptionFlag] = useState(false)


     const [imageOne, setImageOne] = useState()
     const [imageTwo, setImageTwo] = useState()
     const [imageThree, setImageThree] = useState()
     const [imageFour, setImageFour] = useState()
     const [imageFive, setImageFive] = useState()


     const [imageCounter, setImageCounter] = useState(1)

     async function onLocationClick() {
        setLocationFlag(!locationFlag)
      }

      async function cancelImage(number) {

      }

      function onImageClick () {
      

        ImagePicker.showImagePicker(options, (response) => {
                 console.log('Response = ', response);

         if (response.didCancel) {
                console.log('User cancelled image picker');
        } else if (response.error) {
                 console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
             console.log('User tapped custom button: ', response.customButton);
        } else {
             const source = { uri: response.uri };

                switch(imageCounter) {
                    case 1 : setImageOne(source);break;
                    case 2 : setImageTwo(source);break;
                    case 3 : setImageThree(source);break;
                    case 4 : setImageFour(source);break;
                    case 5 : setImageFive(source);break;
                }
                setImageCounter(imageCounter+1)
                console.log("photo")
                console.log(imageOne)

            }
         });

     }
    return (

    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      
    <View style = {styles.main}>

        <TouchableOpacity
                 style = {{marginLeft : 10,marginTop : 10}}
                 onPress={() => closeCallBack()}>
                 <Icon name={"x"}  size={32}  color={"gray"} style = {{marginTop : 10}}  />
            </TouchableOpacity>

            { locationFlag && 
                <View style = {styles.locationView}>
                    <Icon name={"map-pin"}  size={18}   />
                    <Text> Current location </Text>
                </View>
                
            }

            <View style = {styles.descView}>

                <TextInput style = {styles.descTextView}
                     maxLength={250}
                     multiline
                    numberOfLines={9}
                     placeholder = "Write your heart out!"
                     onChangeText={(txt) => setDesc(txt)}
                     />
            </View>

            <View style = {styles.imageAndOptionVIew}>

              { imageOne && 

                <View style = {styles.selectedImageView}>

                <ScrollView horizontal style={{flex:1, backgroundColor:'white'}}>
                {
                    imageOne  &&  <ImageView source = {imageOne}/>
                }
                {
                    imageTwo  &&  <ImageView source = {imageTwo}/>
                }
                {
                    imageThree  &&  <ImageView source = {imageThree}/>
                }
                {
                    imageFour &&  <ImageView source = {imageFour} />
                }
                {
                    imageFive  &&  <ImageView source = {imageFive}/>
                }
                  
                </ScrollView>
                  
                </View>
              }

              
            </View>


            <View style = {styles.toolView}>

                <TouchableOpacity style = {styles.toolOption} 
                 onPress={() => onImageClick()}>
                 <Icon name={"image"}  size={32}   />
               </TouchableOpacity>

               <TouchableOpacity style = {styles.toolOption} 
                 onPress={() => onOptionClick()}>
                 <Icon name={"list"}  size={32}  />
               </TouchableOpacity>

                <TouchableOpacity style = {styles.toolOption} 
                 onPress={() => onLocationClick()}>
                 <Icon name={"map-pin"}  size={32}  />
               </TouchableOpacity>
               
            </View>
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
    locationView : {
        marginTop : 10,
        marginLeft : 10,
        flexDirection : "row"
    },
    descView : {
        flex : 0.3,
        marginTop : 10,
        width : '100%',
        borderColor: "green",
      //  borderWidth : 1
    },
    descTextView : {
      marginLeft : 10,
      marginRight : 10,
      fontSize: 20,
      fontFamily: "Thonburi",
    },
   
    imageAndOptionVIew : {
        flex : 0.6,
        marginTop : 10,
        width : '100%',
        borderColor: "orange",
       // borderWidth : 1
    },
    selectedImageView : {
       flex : 0.5,
      width : '100%',
         borderColor: "orange",
       borderWidth : 1,
      borderColor: "black",
       borderWidth : 1,
    },
    toolView : {
        flex : 0.1,
        marginTop : 10,
        width : '100%',
        borderColor: "blue",
       // borderWidth : 1,
        flexDirection : "row"
    },
    toolOption : {
        marginTop : 10,
        marginLeft : 30,
        marginRight : 10,
    }


});