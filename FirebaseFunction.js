
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();
const storage = admin.storage();


const { parse } = require('querystring');
//twillo
// const twilio = require('twilio')
// const accountSid = functions.config().twilio.sid
// const accountToken = functions.config().twilio.token

// const client = new twilio(accountSid,accountToken)
// const twilioNumber = "+12056904590"



//API to check if user is new to thoughts or not
exports.getUserStatus = functions.https.onRequest((req, resp) => {
	try {

		const authToken = req.headers.authorization
		const usersRef = db.collection('user').doc(authToken)
		usersRef.get()
		.then((docSnapshot) => {
			if (docSnapshot.exists) {
				resp.status(200).send(docSnapshot.data())
			}
			else {
				resp.status(200).send(null)
			}
			return
		})
		.catch( err => {
			console.log("getUserStatus failure", err)
			resp.status(400).send(new Error("Failed to process"))
		});
	}catch(error) {
		console.log("getUserStatus failure", error)
		resp.status(400).send(new Error("Failed to process"))
	}
});
// .collection("user")
// .where("username", "==", "daniya")

// exports.isUserNameAvailable = functions.https.onRequest((req, resp) => {
// 	try {
// 		 let username = req.query.username
// 		 console.log("got username = "+ username)
//
// 		let userRef = db.collection("user");
// 	  let query = userRef.where("username", "==", username).get()
// 	  .then(snapshot => {
// 			if(snapshot.empty) {
// 			resp.status(200).json({ isAvailable: true })
// 		 }else {
// 				resp.status(200).json({ isAvailable: false })
// 			}
// 			return
// 		})
// 	 .catch(err => {
// 			console.log("isUserNameAvailable failure", err)
// 			resp.status(400).send(new Error("Failed to process"))
//  		});
// 	}
// 	catch(error) {
// 		console.log("isUserNameAvailable failure", error)
// 		resp.status(400).send(new Error("Failed to process"))
// 	}
// });

exports.getUserProfileOverView = functions.https.onRequest((req, resp) => {
	try {
		 let useruid = req.query.useruid
		 let myuid = req.query.myuid
     getUserData(useruid)
		 .then( userData => {
			 console.log("userData "+JSON.stringify(userData))
			 	getUserInfo(useruid)
				.then(userInfo => {
					getMyData(myuid,useruid)
						.then( myData => {
							let data = userOverviewResponseBuilder(userInfo,userData,myData,myuid,useruid)
								resp.status(200).json(data)
								return
						})
						.catch(err => {
							resp.status(400).send(err)
							console.log("error is "+err)
						})
						return
			})
		.catch(err => {
				resp.status(400).send(err)
				console.log("error is "+err)
		 });
		 return
		})
		 .catch(err => {
				resp.status(400).send(err)
				console.log("error is "+err)
	 		});

	}
	catch(error) {
		console.log("getUserProfileOverView failure", error)
		resp.status(400).send(new Error("Failed to process"))
	}
});


function getUserData(useruid) {
	return new Promise((resolve,reject) => {
		const usersRef = db.collection('followers').doc(useruid)
		usersRef.get()
		.then((snapshot) => {
			if (!snapshot.exists) {
				reject(Error("User doesn't exist"))
			}
			 console.log("whole data "+JSON.stringify(snapshot.data()))
			let data = {
				blocked : snapshot.data().blocked,
				pendings : snapshot.data().pendings,
				isPrivate : snapshot.data().isPrivate
			}
			resolve(data)
			return
		})
		.catch( err => {
			reject(err)
		});
	});
}

function getUserInfo(uid) {
	return new Promise((resolve,reject) => {
		const usersRef = db.collection('user').doc(uid)
		usersRef.get()
		.then((snapshot) => {
			if (!snapshot.exists) {
				reject(Error("User doesn't exist"))
			}
			let data = {
				username : snapshot.data().username,
				sex : snapshot.data().sex,
				tags : snapshot.data().tags,
				followersCount : snapshot.data().followersCount,
				followingsCount : snapshot.data().followingsCount,
			}
			resolve(data)
			return
		})
		.catch( err => {
			console.log("getUserData failure", err)
			reject(err)
		});
	});

}

function getMyData(myuid,useruid) {
	return new Promise((resolve,reject) => {
		const usersRef = db.collection('followers').doc(myuid)
		usersRef.get()
		.then((snapshot) => {
			if (!snapshot.exists) {
				reject(Error("User doesn't exist"))
			}
			let followings = snapshot.data().followings
			let blocked = snapshot.data().blocked
			let isFollowing = false
			for (user in followings) {
				if(user === useruid) {
					isFollowing = true
				}
			}
			let data = {
				isFollowing : isFollowing,
				blocked : blocked
			}
			resolve(data)
			return
		})
		.catch( err => {
			reject(err)
		});
	});
}


function userOverviewResponseBuilder (userInfo,userData,myData,myuid,useruid) {

	let userBlocked = userData.blocked
	let userPendingRequest = userData.pendings
	let myBlocked =  myData.blocked
	let isFollowing = myData.isFollowing
	let youareblocked =  false
	let youblocked = false
	let isRequested = false

	for (index in userBlocked) {
		if(userBlocked[index] === myuid) {
			youareblocked = true
		}
	}

	for (index in userPendingRequest) {
		if(userPendingRequest[index] === myuid) {
			isRequested = true
		}
	}

	for (index in myBlocked) {
		if(myBlocked[index] === useruid) {
			youblocked = true
		}
	}

	if(youareblocked) {
		return { youareblocked: true }
	}
	else {
		return {
			youareblocked: false,
			youblocked : youblocked,
			isRequested: isRequested,
			isFollowing: isFollowing,
			isPrivate: userData.isPrivate,
			followersCount : userInfo.followersCount,
			followingsCount : userInfo.followingsCount,
			username : userInfo.username,
			sex : userInfo.sex,
			tags : userInfo.tags
		}
	}

}






function newUserOnBoard(number,authToken) {
	console.log(" newUserOnBoarduser token is", authToken)
	let newUserData = {
		sex : "",
		age : "",
		country : "",
		number : number,
		activity_pool : {},
		show : [],
		see : []
	}
	return db.collection('user').doc(authToken).set(newUserData)
}




function responseBuilder(isSuccess,data=null,error="") {

	return response = {
		Success : isSuccess,
		error : error,
		data : data
	}

}
