
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();


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
		var number = req.query.number;
		const usersRef = db.collection('user').doc(authToken)
		usersRef.get()
		.then((docSnapshot) => {
			if (docSnapshot.exists) {
				let data = {
					isNewUser : false
				}
				console.log("getUserStatus Success", data)
				resp.send(responseBuilder(true,data))
			} 
			else {
				let data = {
					isNewUser : true
				}
				let respo =  newUserOnBoard(number,authToken)
				respo ? resp.send(responseBuilder(true,data)) : resp.send(responseBuilder(false,"couldn't add new user"))
			} 
			return
		})
		.catch( err => {
			console.log("getUserStatus failure", err)
			resp.send(responseBuilder(false,err.message))
		});
	}catch(error) {
		console.log("getUserStatus failure", error)
		resp.send(responseBuilder(false,error.message))
	}
});

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


exports.getMissedThoughts = functions.https.onRequest((req, resp) => {
	try {
		const authToken = req.headers.authorization
		const userNumber = req.query.number

		getUserSeeArray(authToken)
		.then ((see) => {

			
			getUserUid(see)
			.then ( (users) => {
				
				users.push(authToken)
				getThoughtsId(users)
				.then ( (thoughtsId) => {
				  let data = {
				    thoughtsId : thoughtsId
				  }
				  resp.send(responseBuilder(true,data))
				  return
				})
				.catch ( err => {
					console.log("getMissedThoughts failure", err)
					resp.send(responseBuilder(false,err.message))
				});

				return
			})
			.catch(err => {
				console.log("getMissedThoughts failure", err)
			   resp.send(responseBuilder(false,err.message))
			})
		  return
		})
		.catch (err => {
			console.log("getMissedThoughts failure", err)
			resp.send(responseBuilder(false,err.message))
		});

	}
	catch (error) {
		console.log("getMissedThoughts failure", error)
		resp.send(responseBuilder(false,error.message))
	}
});

var getUserSeeArray = (uid) => {
	return new Promise((resolve,reject) => {
		console.log("auth token ", uid)
		const usersRef = db.collection('user').doc(uid)
		usersRef.get()
		.then((seeSnapshot) => {
			if (!seeSnapshot.exists) {
				console.log("getUserSeeArray : see array empty")
				reject(Error("User doesn't exist"))
			} 
			console.log("getUserSeeArray Success", seeSnapshot.data().see)
			resolve(seeSnapshot.data().see)
			return
		})
		.catch( err => {
			console.log("getUserSeeArray failure", err)
			reject(err)
		});
	});
}

var getUserUid = (numberArray) => {
	return new Promise((resolve,reject) => {
		var uidArray = []
		let userRef = db.collection('user');
		userRef.where('number', 'in', numberArray).get()
		.then( userSnapshot => {

			userSnapshot.forEach(doc => {
				uidArray.push(doc.id)
			});
			resolve(uidArray)
			console.log("getUserUid Success ", uidArray)
			return
		})
		.catch(err => {
			console.log("getUserUid failure", err)
			reject(err) 
		});
	});
}


var getThoughtsId = (uidArray)  => {
	return new Promise((resolve,reject) => {
		let thoughtsRef = db.collection('thoughts');
		var thoughtIdArray = []
		console.log("input getThoughtsId ", uidArray)
		thoughtsRef.where('user_key', 'in', uidArray).get()
		.then( (thoughtsSnapshot) => {

			thoughtsSnapshot.forEach(thoughts => {
				thoughtIdArray.push(thoughts.data())
			});
			resolve(thoughtIdArray)
			console.log("getThoughtsId Success ", thoughtIdArray)
			return
		})
		.catch(err => {
			console.log("getThoughtsId failure", err)
			reject(err)
		});

	});

}


function responseBuilder(isSuccess,data=null,error="") {

	return response = {
		Success : isSuccess,
		error : error,
		data : data
	}
}


