
import RNFetchBlob from 'rn-fetch-blob'
import { firebase } from '@react-native-firebase/storage';
import * as userStorage from "thoughts/app/storage/Local/UserStorage";
import ImageResizer from 'react-native-image-resizer';

export async function saveProfileBase64 (url){
	try {
		   // const storage = firebase.storage()
	     // const ref = await storage.ref('/profile_pic_max/GirlPlaceholderMax.jpg')
			 // let downloadURL = await ref.getDownloadURL();
			 // console.log("download url is "+downloadURL)

	return new Promise((resolve,reject) => {
	 RNFetchBlob.fetch('GET', url, {
  		})
  	.then((res) => {
    let status = res.info().status;

    if(status == 200) {
      let base64Str = 'data:image/png;base64,'+res.base64()
      resolve(base64Str)
    }
  })
  .catch((errorMessage, statusCode) => {
    reject(errorMessage)
 	 })
 	});
 }
 catch(err) {
	console.log("file helper error "+ err)
 }
}

export async function getProfilePic () {
try {
	let userProfileURLPromise = userStorage.getUserProfilePath()
	let path = await userProfileURLPromise;

	console.log("Download file path "+ path)
	return new Promise((resolve,reject) => {
			let data = ''
		RNFetchBlob.fs.readStream(path,'base64',4095)
		.then((ifstream) => {
    		ifstream.open()
    		ifstream.onData((chunk) => {
      			data += chunk
    })
    ifstream.onError((err) => {
      console.log('oops', err)
    })
    ifstream.onEnd(() => {
       resolve(data)
    })
   })
  });
}
catch(err) {
	console.log("error is "+ err)
}
}

export async function getResizedImage(image) {
return new Promise((resolve,reject) => {
	ImageResizer.createResizedImage(image, 400, 500, 'JPEG', 100)
	.then(response => {

		resolve(response.uri)

	// response.uri is the URI of the new image that can now be displayed, uploaded...
	// response.path is the path of the new image
	// response.name is the name of the new image with the extension
	// response.size is the size of the new image
	})
	.catch(err => {

		reject(err)
	// Oops, something went wrong. Check that the filename is correct and
	// inspect err to get more details.
	});
});


}
