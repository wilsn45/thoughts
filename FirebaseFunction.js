
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();
const storage = admin.storage();
const nodemailer = require('nodemailer')

const { parse } = require('querystring');


let transporter = nodemailer.createTransport({
		service: 'gmail',
    auth: {
        user: 'shakya4577@gmail.com',
        pass: '9210456121'
    }
});
//twillo
// const twilio = require('twilio')
// const accountSid = functions.config().twilio.sid
// const accountToken = functions.config().twilio.token

// const client = new twilio(accountSid,accountToken)
// const twilioNumber = "+12056904590"



exports.signUp = functions.https.onRequest((req, resp) => {
	try {

		const email = req.query.email.toLowerCase();
		const usersRef = db.collection('secret')

		usersRef.where("email", "==", email)
		.get()
		.then((docSnapshot) => {
			if (!docSnapshot.empty) {
				console.log("sing up: user exists")
				resp.status(200).json({userExists: true})
				return
			}
		  sendEmail(email,true)
				.then(pin => {
					resp.status(200).json({userExists: false, pin: pin})
					return
				})
				.catch(err => {
					console.log("signUp failure", err)
					resp.status(400).send(new Error("Failed to process"))
			 })
			return
		})
		.catch( err => {
			console.log("signUp failure", err)
			resp.status(400).send(new Error("Failed to process"))
		});
	}catch(error) {
		console.log("signUp failure", error)
		resp.status(400).send(new Error("Failed to process"))
	}
});

function sendEmail(email,isSignUp) {
	return new Promise((resolve,reject) => {

		const dest = email;
		var pin = Math.floor(1000 + Math.random() * 9000);

		let subject
		let bodyString
		if (isSignUp) {
			 subject = 'Welcome to Thoughts!!!'
			 bodyString =  `<p style="font-size: 16px;">Your verification pin is ${pin} </p>
					<br />
					<img src="https://images.prod.meredith.com/product/fc8754735c8a9b4aebb786278e7265a5/1538025388228/l/rick-and-morty-pickle-rick-sticker" />
			`
		}
		else {
			 subject = 'Forgot Password!!!'
			 bodyString =  `<p style="font-size: 16px;">Your verification pin to set password is ${pin} </p>
					<br />
					<img src="https://images.prod.meredith.com/product/fc8754735c8a9b4aebb786278e7265a5/1538025388228/l/rick-and-morty-pickle-rick-sticker" />
			`
		}

      const mailOptions = {
            from: '"thoughts" <shakya4577@gmail.com>',
            to: email,
            subject: subject,
            html:  bodyString // email content in HTML
        };

        // returning result
        return transporter.sendMail(mailOptions, (erro, info) => {
            if(erro){
							console.log("sendVerificationPin "+erro)
                reject(erro)
            }
						console.log("mail send")
            resolve(pin)
        })

	});
}

exports.addNewUser = functions.https.onRequest((req, resp) => {
	try {

		const email = req.query.email.toLowerCase();
		const password = req.query.password
		const username = req.query.username
		const sex = req.query.sex

		let secretUser = {
			email : email,
			password : password,
			username : username
		}

		let newUser = {
		  	email : email,
				username : username,
				sex : sex,
				isPrivate : false
		}

		db.collection('secret').add(secretUser)
		.then (docRef => {
				db.collection('user').doc(docRef.id).set(newUser)
				resp.status(200).json({token: docRef.id})
				return
		})
		.catch(err => {
			console.log("addNewUser failure", err)
			resp.status(400).send(new Error("Failed to process"))
		})

	}catch(error) {
		console.log("addNewUser failure", error)
		resp.status(400).send(new Error("Failed to process"))
	}
});


exports.login = functions.https.onRequest((req, resp) => {
	try {

		const cred = req.query.cred
		const password = req.query.password

		var re = /\S+@\S+\.\S+/;
    let isEmail = re.test(String(cred).toLowerCase());

		console.log("is email "+isEmail)

		let secretQry = null

		if(isEmail) {
			secretQry = db.collection('secret')
			.where("email", "==", cred.toLowerCase())
			.where("password", "==", password)
		}
		else {
			secretQry = db.collection('secret')
			.where("username", "==", cred)
			.where("password", "==", password)
		}

		secretQry
			.get()
			.then((snapshot) => {
				if (snapshot.empty) {
					resp.status(200).json({userExists : false, userInfo : null})
					return
				}

				snapshot.forEach(doc => {
      		console.log(doc.id, '=>', doc.data());
					getUser(doc.data().username)
 					.then(data => {
 							resp.status(200).json({userExists : true , userInfo : data})
 							return
 					 })
 					.catch(err => {
 						console.log("login failure", err)
 						resp.status(400).send(new Error("Failed to process"))
 					})
     		});

				return
			})
			.catch( err => {
				console.log("login failure", err)
				resp.status(400).send(err)
			});
	}catch(error) {
		console.log("signUp failure", error)
		resp.status(400).send(error)
	}
});


function getUser(username) {
	return new Promise((resolve,reject) => {
		const usersRef = db.collection('user')
		usersRef
		.where("username", "==", username)
		.get()
		.then((snapshot) => {

			if (snapshot.empty) {
				reject(new Error("User doesn't exists"))
				return
			}
			snapshot.forEach(doc => {
				let data = {
					uid : doc.id,
					username : doc.data().username,
					sex : doc.data().sex,
					isPrivate : doc.data().isPrivate
				}
			 resolve(data)
			});
		 return
	 })
	 .catch( err => {
			 console.log("getUser error is "+err)
		 reject(err)
	 });
	});
}



exports.forgotPassword = functions.https.onRequest((req, resp) => {
	try {

		const cred = req.query.cred

		var re = /\S+@\S+\.\S+/;
    let isEmail = re.test(String(cred));

		console.log("is email "+isEmail)

		let secretQry = null

		if(isEmail) {
			secretQry = db.collection('secret')
			.where("email", "==", cred.toLowerCase())
		}
		else {
			secretQry = db.collection('secret')
			.where("username", "==", cred)
		}

		secretQry
			.get()
			.then((snapshot) => {
				if (snapshot.empty) {
					resp.status(200).json({userExists: false})
					return
				}

				snapshot.forEach(doc => {

					let email = doc.data().email
					console.log("email is", '=>', email);
					sendEmail(email,false)
						.then(pin => {
							resp.status(200).json({userExists: true, pin: pin, email : email})
							return
						})
						.catch(err => {
							console.log("forgotPassword failure", err)
							resp.status(400).send(new Error("Failed to process"))
					 })
     		});

				return
			})
			.catch( err => {
				console.log("forgotPassword failure", err)
				resp.status(400).send(err)
			});
	}catch(error) {
		console.log("forgotPassword failure", error)
		resp.status(400).send(error)
	}
});




exports.setPassword = functions.https.onRequest((req, resp) => {
	try {

		const email = req.query.email.toLowerCase()
		const password = req.query.password


		db.collection('secret')
		.where("email", "==", email)
			.get()
			.then((snapshot) => {
				if (snapshot.empty) {
					resp.status(400).send()
					return
				}

				snapshot.forEach(doc => {
					db.collection('secret').doc(doc.id).update({password:password})
					getUser(doc.data().username)
 					.then(data => {
 							resp.status(200).json({userInfo : data})
 							return
 					 })
 					.catch(err => {
 						console.log("setPassword failure", err)
 						resp.status(400).send(new Error("Failed to process"))
 					})
     		});

				return
			})
			.catch( err => {
				console.log("setPassword failure", err)
				resp.status(400).send(err)
			});
	}catch(error) {
		console.log("setPassword failure", error)
		resp.status(400).send(error)
	}
});

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


exports.unfollow= functions.https.onRequest((req, resp) => {
	try {
		 let useruid = req.headers.useruid
		 let myuid = req.headers.myuid
		 removeFollowing(myuid,useruid)
		 .then(mSuccess => {
			 		removeFollower(useruid,myuid)
					.then(tSuccess => {
						resp.status(200).send()
						updateCount(myuid,useruid)
						return
					})
					.catch(err => {
						resp.status(400).send(err)
					})
					return
		 })
		 .catch(err => {
			 resp.status(400).send(err)
		 })
	}
	catch(error) {
		console.log("unfollowUser error is "+err)
		resp.status(400).send(new Error("Failed to process"))
	}
});

exports.follow = functions.https.onRequest((req, resp) => {
	try {
		 let useruid = req.headers.useruid
		 let myuid = req.headers.myuid
		 let followingusername = req.query.followingusername
		 let followerusername = req.query.followerusername
		 addFollowerIsPrivate(useruid,myuid,followerusername)
		 .then(isPrivate => {
			 		if(isPrivate) {
						 resp.status(200).send()
					}else {
							addFollowing(myuid,useruid,followingusername)
							.then(success => {
									resp.status(200).send()
									updateCount(myuid,useruid)
									return
							})
							.catch(err => {
								resp.status(400).send(err)
							})
					}
					return
		 })
		 .catch(err => {
			 resp.status(400).send(err)
		 })
	}
	catch(error) {
		console.log("followUser error is "+err)
		resp.status(400).send(error)
	}
});



exports.acceptRequest = functions.https.onRequest((req, resp) => {
	try {
		 let useruid = req.headers.useruid
		 let myuid = req.headers.myuid
		 let followingusername = req.query.followingusername
		 let followerusername = req.query.followerusername
		 removePendingsAcceptRequest(myuid,useruid,followerusername)
		 .then(success => {
			 			addFollowing(useruid,myuid,followingusername)
						.then(success => {
							resp.status(200).send()
							updateCount(myuid,useruid)
							return
						})
						.catch(err => {
							resp.status(400).send(err)
						})
					return
		 })
		 .catch(err => {
			 resp.status(400).send(err)
		 })
	}
	catch(error) {
		console.log("followUser error is "+err)
		resp.status(400).send(error)
	}
});

exports.cancelRequest = functions.https.onRequest((req, resp) => {
	try {
		 let useruid = req.headers.useruid
		 let myuid = req.headers.myuid
		  removePendings(useruid,myuid)
		 .then(success => {
			 			resp.status(200).send()
					return
		 })
		 .catch(err => {
			 resp.status(400).send(err)
		 })
	}
	catch(error) {
		console.log("followUser error is "+err)
		resp.status(400).send(error)
	}
});

exports.block = functions.https.onRequest((req, resp) => {
	try {
		 let useruid = req.headers.useruid
		 let myuid = req.headers.myuid
		 let blockingusername = req.query.blockingusername
		 addingToBlock(myuid,useruid,blockingusername)
		 .then(success => {
			 			removeFollowingBlock(useruid,myuid)
						.then(success => {
							resp.status(200).send()
							return
						})
						.catch(err => {
							resp.status(400).send(err)
						})
					return
		 })
		 .catch(err => {
			 resp.status(400).send(err)
		 })
	}
	catch(error) {
		console.log("followUser error is "+err)
		resp.status(400).send(error)
	}
});


exports.unblock = functions.https.onRequest((req, resp) => {
	try {
		 let useruid = req.headers.useruid
		 let myuid = req.headers.myuid
		 removeBlock(myuid,useruid)
		 .then(success => {
			 			resp.status(200).send()
					return
		 })
		 .catch(err => {
			 resp.status(400).send(err)
		 })
	}
	catch(error) {
		console.log("followUser error is "+err)
		resp.status(400).send(error)
	}
});

function addFollowing(to,uid,username) {
	return new Promise((resolve,reject) => {
		const usersRef = db.collection('followers').doc(to)
		usersRef.get()
		.then((snapshot) => {
		 if (!snapshot.exists) {
			 reject(new Error("User doesn't exists"))
		 }
		 let followings = snapshot.data().followings
		 followings[uid] = username
		 usersRef.update({followings:followings});
		 resolve(true)
		 return
	 })
	 .catch( err => {
			 console.log("addFollowing error is "+err)
		 reject(err)
	 });
	});
}

function removeFollowing(from,uid) {
	return new Promise((resolve,reject) => {
		const usersRef = db.collection('followers').doc(from)
		usersRef.get()
		.then((snapshot) => {
		 if (!snapshot.exists) {
			 reject(new Error("User doesn't exists"))
		 }
		 let followings = snapshot.data().followings
		 delete followings[uid]
		 usersRef.update({followings:followings});
		 resolve(true)
		 return
	 })
	 .catch( err => {
			 console.log("removeFollowing error is "+err)
		 reject(err)
	 });
	});
}

function addFollowerIsPrivate(to,uid,username) {
	return new Promise((resolve,reject) => {
		const usersRef = db.collection('followers').doc(to)
		usersRef.get()
		.then((snapshot) => {
		 if (!snapshot.exists) {
			 reject(new Error("User doesn't exists"))
		 }
		 let isPrivate = snapshot.data().isPrivate
			if (isPrivate) {
			 let pendings = snapshot.data().pendings
			 pendings[uid] = username
	 		 usersRef.update({pendings:pendings});
			} else {
			  let followers = snapshot.data().followers
				followers[uid] = username
				usersRef.update({followers:followers});
		}
		resolve(isPrivate)
		 return
	 })
	 .catch( err => {
			 console.log("addFollowerIsPrivate error is "+err)
		 reject(err)
	 });
	});
}

function addFollower(to,uid) {
	return new Promise((resolve,reject) => {
		const usersRef = db.collection('followers').doc(to)
		usersRef.get()
		.then((snapshot) => {
		 if (!snapshot.exists) {
			 reject(new Error("User doesn't exists"))
		 }
		 let followers = snapshot.data().followers
		 followers[uid] = username
		 usersRef.update({followers:followers});
		 resolve(true)
		 return
	 })
	 .catch( err => {
			 console.log("addFollower error is "+err)
		 reject(err)
	 });
	});
}

function removeFollowingBlock(from,uid) {
	return new Promise((resolve,reject) => {
		const usersRef = db.collection('followers').doc(from)
		usersRef.get()
		.then((snapshot) => {
		 if (!snapshot.exists) {
			 reject(new Error("User doesn't exists"))
		 }
		 	  let followings = snapshot.data().followings
				let followers = snapshot.data().followers
				delete followings[uid]
				delete followers[uid]
				usersRef.update({followings:followings,followers:followers});
				resolve(true)
		 return
	 })
	 .catch( err => {
			 console.log("removeFollowingBlock error is "+err)
		  reject(err)
	 });
	});
}

function removeFollower(from,uid) {
	return new Promise((resolve,reject) => {
		const usersRef = db.collection('followers').doc(from)
		usersRef.get()
		.then((snapshot) => {
		 if (!snapshot.exists) {
			 reject(new Error("User doesn't exists"))
		 }
		 let followers = snapshot.data().followers
		 delete followers[uid]
		 usersRef.update({followers:followers});
		 resolve(true)
		 return
	 })
	 .catch( err => {
			 console.log("removeFollower error is "+err)
		 reject(err)
	 });
	});
}

function addPendings(to,uid) {
	return new Promise((resolve,reject) => {
		const usersRef = db.collection('followers').doc(to)
		usersRef.get()
		.then((snapshot) => {
		 if (!snapshot.exists) {
			 reject(new Error("User doesn't exists"))
		 }
		 let pendings = snapshot.data().pendings
		 pendings[uid] = username
		 usersRef.update({pendings:updatedPendings});
		 resolve(true)
		 return
	 })
	 .catch( err => {
			 console.log("addFollower error is "+err)
		 reject(err)
	 });
	});
}

function removePendings(from,uid) {
	return new Promise((resolve,reject) => {
		const usersRef = db.collection('followers').doc(from)
		usersRef.get()
		.then((snapshot) => {
		 if (!snapshot.exists) {
			 reject(new Error("User doesn't exists"))
		 }
		 let pendings = snapshot.data().pendings
		 delete pendings[uid]
		 usersRef.update({pendings:pendings});
		 resolve(true)
		 return
	 })
	 .catch( err => {
			 console.log("removePendings error is "+err)
		 reject(err)
	 });
	});
}

function removePendingsAcceptRequest(from,uid,username) {
	return new Promise((resolve,reject) => {
		const usersRef = db.collection('followers').doc(from)
		usersRef.get()
		.then((snapshot) => {
		 if (!snapshot.exists) {
			 reject(new Error("User doesn't exists"))
		 }
		 	  let pendings = snapshot.data().pendings
				let followers = snapshot.data().followers
				delete pendings[uid]
				followers[uid] = username
				usersRef.update({pendings:pendings,followers:followers});
				resolve(true)
		 return
	 })
	 .catch( err => {
			 console.log("removePendingsAcceptRequest error is "+err)
		  reject(err)
	 });
	});
}

function addingToBlock(to,uid,username) {
	return new Promise((resolve,reject) => {
		const usersRef = db.collection('followers').doc(to)
		usersRef.get()
		.then((snapshot) => {
		 if (!snapshot.exists) {
			 reject(new Error("User doesn't exists"))
		 }
		 		let blocked = snapshot.data().blocked
		 	  let followings = snapshot.data().followings
				let followers = snapshot.data().followers
				delete followings[uid]
				delete followers[uid]
				blocked[uid] = username
				usersRef.update({blocked: blocked,followings:followings,followers:followers});
				resolve(true)
		 return
	 })
	 .catch( err => {
			 console.log("removeFollowingBlock error is "+err)
		  reject(err)
	 });
	});
}



function addBlock(to,uid) {
	return new Promise((resolve,reject) => {
		const usersRef = db.collection('followers').doc(to)
		usersRef.get()
		.then((snapshot) => {
		 if (!snapshot.exists) {
			 reject(new Error("User doesn't exists"))
		 }
		 let blocked = snapshot.data().blocked
		 blocked[uid] = username
		 usersRef.update({blocked:updatedBlocked});
		 resolve(true)
		 return
	 })
	 .catch( err => {
			 console.log("addBlock error is "+err)
		 reject(err)
	 });
	});
}

function removeBlock(from,uid) {
	return new Promise((resolve,reject) => {
		const usersRef = db.collection('followers').doc(from)
		usersRef.get()
		.then((snapshot) => {
		 if (!snapshot.exists) {
			 reject(new Error("User doesn't exists"))
		 }
		 let blocked = snapshot.data().blocked
		 delete blocked[uid]
		 usersRef.update({blocked:blocked});
		 resolve(true)
		 return
	 })
	 .catch( err => {
			 console.log("removePendings error is "+err)
		 reject(err)
	 });
	});
}

exports.updateCounts = functions.firestore
    .document('followers/{user}')
    .onUpdate((change, context) => {
      const uid = context.params.user;
      const newValue = change.after.data();
			let followers = newValue.followers
 		 	let followings = newValue.followings
 		 	let followersCount = 0
 		 	let followingsCount = 0

 		 	for (user in followers) {
 			 	followersCount = followersCount+1
 		 	}

 		  for (user in followings) {
 			 	followingsCount = followingsCount+1
 		 	}
    	return db.collection('user').doc(uid).update({followersCount : followersCount,followingsCount : followingsCount})

      // perform desired operations ...
});


function updateCount(myuid,useruid) {
return new Promise((resolve,reject) => {
		getCounts(myuid)
		.then( myCount => {
			  let myFollowersCount = myCount.followers
				let myFollowingsCount = myCount.followings
				usersRef.update({followersCount: myFollowersCount,followingsCount:myFollowingsCount});

				getCounts(useruid)
				.then( theirCount => {
					let theirFollowersCount = theirCount.followers
					let theirFollowingsCount = theirCount.followings
					usersRef.update({followersCount: theirFollowersCount,followingsCount:theirFollowingsCount});
					return
				})
				.catch(err => {
					console.log("updateCount error is "+err)
				})
				return
		})
		.catch(err => {
			console.log("updateCount error is "+err)
		})
});

}

function getCounts(uid) {
	return new Promise((resolve,reject) => {
		const usersRef = db.collection('followers').doc(uid)
		usersRef.get()
		.then((snapshot) => {
		 if (!snapshot.exists) {
			 reject(new Error("User doesn't exists"))
		 }
		 let followers = snapshot.data().followers
		 let followings = snapshot.data().followings
		 let followersCount = 0
		 let followingCount = 0

		 for (user in followers) {
			 followersCount = followersCount+1
		 }

		 for (user in followings) {
			 followingCount = followingCount+1
		 }

		 let count = {
			 followers : followersCount,
			 followings : followingCount
		 }
		 console.log("data is "+ JSON.stringify(count))
		 resolve(count)
		 return
	 })
	 .catch( err => {
			 console.log("getCounts error is "+err)
		 reject(err)
	 });
	});
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

exports.replyOnThought = functions.https.onRequest((req, resp) => {
	try {
		 let senderuid = req.headers.useruid
		 let creatoruid = req.headers.creatoruid

		 let sendername = req.query.username
		 let creatorname = req.query.creatorname

		 let thoughtsuid = req.query.thoughtsuid
		 let thoughtsTitle = req.query.thoughtsTitle
		 let message = req.query.message
		 let thoughtsRef = req.query.thoughtsRef

		 let users =  [senderuid,creatoruid]
		 var time = new Date();

		 let chatsRef = db.collection("chats");
		  chatsRef.where("users", 'array-contains', senderuid)
	    chatsRef.where("users", 'array-contains', creatoruid).get()
		 .then(snapshot => {
			  console.log("snapshot: ", snapshot);
			 if(snapshot.empty) {

				let response = chatsRef.add({
					 users : users,
					 lastmessagetimestamp : admin.firestore.FieldValue.serverTimestamp()
				 })
				 .then(docRef => {
    	 	  chatsRef.doc(docRef.id).collection('messages').add({
							sender : sendername,
	 					 	message : message,
	 					 	thoughtsTitle : thoughtsTitle,
	 					 	thoughtsRef : thoughtsuid,
							timestamp : admin.firestore.FieldValue.serverTimestamp()
						})
					 resp.status(200).send()
					return
				})
			.catch(err => {
    				console.error("Error adding document: ", error);
						resp.status(400).send(err)
			 });

		 }
		 snapshot.forEach(doc => {
			 chatsRef.doc(doc.id).update({sender:sendername,message:message,thoughtsTitle : thoughtsTitle,thoughtsRef : thoughtsuid});
			 chatsRef.doc(doc.id).collection('messages').add({
				 	sender : sendername,
				 	message : message,
				 	thoughtsTitle : thoughtsTitle,
				 	thoughtsRef : thoughtsuid,
					timestamp : admin.firestore.FieldValue.serverTimestamp()
				 })
				resp.status(200).send()
      });

			 return
		 })
		 .catch(err => {
			 console.log("replyOnThought eror is "+err)
			 resp.status(400).send(err)
		 })

	}
	catch(error) {
		console.log("replyOnThought error is "+error)
		resp.status(400).send(error)
	}
});

function responseBuilder(isSuccess,data=null,error="") {

	return response = {
		Success : isSuccess,
		error : error,
		data : data
	}

}
