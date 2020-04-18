
import RNFetchBlob from 'rn-fetch-blob'
import storage from '@react-native-firebase/storage';
import * as userStorage from "thoughts/app/storage/Local/UserStorage";

export async function saveProfileBase64 (url){
	try {

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
