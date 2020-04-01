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

    const [locationFlag, setLocationFlag] = useState(true)
    
    const [optionFlag, setOptionFlag] = useState(false)


     const [imageOne, setImageOne] = useState()
     const [imageTwo, setImageTwo] = useState()
     const [imageThree, setImageThree] = useState()
     const [imageFour, setImageFour] = useState()
     const [imageFive, setImageFive] = useState()
     const [imageSix, setImageSix] = useState()


     const [imageCounter, setImageCounter] = useState(1)



     const [optionThreeVisisble, setOptionThreeVisible] = useState(false)
     const [optionFourVisisble, setOptionFourVisible] = useState(false)

     async function onLocationClick() {
        setLocationFlag(!locationFlag)
      }

       async function onOptionClick() {
        setOptionFlag(!optionFlag)
      }

      
      function onImageClick () {
      

        ImagePicker.showImagePicker(options, (response) => {
                 console.log('Response = ', response);
            if (response.didCancel) {
               
        } else if (response.error) {
               
        } else if (response.customButton) {
            
        } else {
             const source = { uri: response.uri };
             console.log("counter adding +" + imageCounter)
              console.log("source url +" + response.uri)
                switch(imageCounter) {
                    case 1 : setImageOne(source);break;
                    case 2 : setImageTwo(source);break;
                    case 3 : setImageThree(source);break;
                    case 4 : setImageFour(source);break;
                    case 5 : setImageFive(source);break;
                    case 6 : setImageSix(source);break;
                }
                setImageCounter(imageCounter+1)
            }
         });

     }

     function cancelCallback(number) {

       console.log("counter deleting +" + imageCounter)

         switch(number) {
                    case 1 : {
                      setImageOne(imageTwo)
                      setImageTwo(imageThree)
                      setImageThree(imageFour)
                      setImageFour(imageFive)
                      setImageFive(imageSix)
                      setImageSix(null)
                    };break;
                    case 2 : {
                      setImageTwo(imageThree)
                      setImageThree(imageFour)
                      setImageFour(imageFive)
                      setImageFive(imageSix)
                      setImageSix(null)
                    };break;
                    case 3 : {
                      setImageThree(imageFour)
                      setImageFour(imageFive)
                      setImageFive(imageSix)
                      setImageSix(null)
                    };break;
                    case 4 : {
                      setImageFour(imageFive)
                      setImageFive(imageSix)
                      setImageSix(null)
                    };break;
                    case 5 : {
                      setImageFive(imageSix)
                      setImageSix(null)
                    };break;
                    case 6 : setImageSix(null);break;
                }
                setImageCounter(imageCounter-1)
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
            <ScrollView style = {styles.ScrollView}>
            <View style = {styles.descView}>

                <TextInput style = {styles.descTextView}
                     maxLength={250}
                     multiline
                    numberOfLines={9}
                     placeholder = "Write your heart out!"
                     onChangeText={(txt) => setDesc(txt)}
                     />
            </View>

           { imageOne &&

                  <View style= {{flexDirection : "row", height : 125, paddingLeft : 10}}>
                     {
                        imageOne && <ImageView source = {imageOne} cancelCallback = {cancelCallback} number = {1}/>
                     }
                     {
                        imageTwo && <ImageView source = {imageTwo} cancelCallback = {cancelCallback} number = {2}/>
                     }
                     {
                        imageThree && <ImageView source = {imageThree} cancelCallback = {cancelCallback} number = {3}/>
                     }

                  </View>
                 }

                  { imageFour &&

                  <View style= {{flexDirection : "row", height : 125, paddingLeft : 10}}>

                    {
                      imageFour && <ImageView source = {imageFour} cancelCallback = {cancelCallback} number = {4}/>
                    }
                    {
                       imageFive && <ImageView source = {imageFive} cancelCallback = {cancelCallback} number = {5}/>
                    }
                    {
                      imageSix && <ImageView source = {imageSix} cancelCallback = {cancelCallback} number = {6}/>
                    }

                  </View>
                }
              
              {
                 optionFlag && 

                 <View style = {styles.optionView}>

                <TextInput style = {styles.optionInput}
                    placeholder = "Choice 1"> 
                </TextInput>

                <View style = {{flexDirection : "row"}}>

                  <TextInput style = {styles.optionInput}s
                    placeholder = "Choice 2"> 
                  </TextInput>

                  {
                     !optionThreeVisisble && 

                      <TouchableOpacity style = {{marginLeft : 5, alignSelf : "center"}} 
                      onPress={() => setOptionThreeVisible(true)}>
                     <Icon name={"plus-circle"}  size={28}  />
                     </TouchableOpacity>
                  }
              </View>

              {
                 optionThreeVisisble && 

                 <View style = {{flexDirection : "row"}}>
                
                  <TextInput style = {styles.optionInput}s
                    placeholder = "Choice 3 (optional)"> 
                  </TextInput>

                   {
                     !optionFourVisisble &&  
                     <TouchableOpacity style = {{marginLeft : 5, alignSelf : "center"}} 
                       onPress={() => setOptionFourVisible(true)}>
                      <Icon name={"plus-circle"}  size={28}  />
                     </TouchableOpacity>
                   }
               </View>
              }

              {
                optionFourVisisble && 

                <TextInput style = {styles.optionInput}
                    placeholder = "Choice 4 (optional)"> 
                </TextInput>
              }

               </View>
             
              }

            </ScrollView>

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
        flex : 0.05,
        marginTop : 10,
        marginLeft : 10,
        flexDirection : "row"
    },
    ScrollView : {
       flex : 0.85,
        marginTop : 10,
        width : '100%',
        borderColor: "pink",
       //borderWidth : 1
    },
    descView : {
        width : '100%',
        borderColor: "green",
        marginBottom : 30
       // borderWidth : 1
    },
    descTextView : {
      marginLeft : 10,
      marginRight : 10,
      fontSize: 20,
      fontFamily: "Thonburi",
    },
   optionView : {
       width : '100%',
       borderColor: "blue",
       // borderWidth : 1,
       paddingLeft : 10
    },
    optionInput : {
      height : 50,
      width : 270,
      borderColor : "grey",
      borderRadius : 10,
      borderWidth : 1,
      margin : 10,
      paddingLeft : 10
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