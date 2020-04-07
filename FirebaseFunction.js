
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();
//twillo 
// const twilio = require('twilio')
// const accountSid = functions.config().twilio.sid
// const accountToken = functions.config().twilio.token

// const client = new twilio(accountSid,accountToken)
// const twilioNumber = "+12056904590"



//API to check if user is new to thoughts and to add his all contacts in viewers(see,show) array
exports.getUserOn = functions.https.onRequest((req, resp) => {
   try {
	   //const authToken = "FwGg2GKkg5mqLwlKLi2n"

	   const authToken = req.headers.authorization
	   var numberArray = JSON.parse(req.query.numberArray);
	   var number = req.query.number;
	   const usersRef = db.collection('user').doc(authToken)
	   usersRef.get()
  		 .then((docSnapshot) => {
  		   if (docSnapshot.exists) {
			db.collection('user').doc(authToken).update({see:numberArray,show:numberArray});

			let data = {
  		   		isNewUser : false
  		   	}
            resp.send(responseBuilder(true,data))
			} else {
		   	let data = {
  		   		isNewUser : true
  		   	}
     	    let respo =  newUserOnBoard(number,numberArray,authToken)
     	    respo ? resp.send(responseBuilder(true,data)) : resp.send(responseBuilder(false,null,"couldn't add new user"))
     	  } 
     	  return
           })
         .catch( err => {
         	resp.send(responseBuilder(false,null,err.message))
		 });
	}catch(error) {
		 resp.send(responseBuilder(false,null,error.message))
	}
});

function newUserOnBoard(number,numberArray,authToken) {
	let newUserData = {
		sex : "",
		age : "",
		country : "",
		number : number,
		activity_pool : {},
		show : numberArray,
		see : numberArray
	}
	return db.collection('user').doc(authToken).set(newUserData)
}


//API to get all thoughts : for newly logged in person

exports.getMissedThoughts = functions.https.onRequest((req, resp) => {
 try {
	  var numberArray = JSON.parse(req.query.numberArray);
	  var uidArray = []
	  var thoughtsArray = []
	  let userRef = db.collection('user');
	  let thoughtsRef = db.collection('thoughts');

	  let query = userRef.where('number', 'in', numberArray).get()
      .then(userSnapshot => {
        if (userSnapshot.empty) {
         console.log('No matching user.'); 
         resp.send(responseBuilder(true,null))
       }  
	   userSnapshot.forEach(doc => {
       uidArray.push(doc.id)
       });
	   console.log("uid array =>",uidArray);
	   let query = thoughtsRef.where('user_id', 'in', uidArray).get()
	   .then((thoughtsSnapshot) => {
	   		if (thoughtsSnapshot.empty) {
               console.log('No matching thoughts.'); 
               resp.send(responseBuilder(true,null))
     	    }
     	    thoughtsSnapshot.forEach(thoughts => {
        		console.log(thoughts.id, '=>', thoughts.data());
        		thoughtsArray.push(thoughts)
       		});

       	  let data = {
	   		 thoughts : thoughtsArray
	   	   }
	  	  resp.send(responseBuilder(true,data))
	  	  return
	    }).catch (err => {
	    	resp.send(responseBuilder(false,null,err.message))
	    })

	 return
    })
    .catch(err => {
      resp.send(responseBuilder(false,null,err.message))
   });
  }
  catch (error) {
  	resp.send(responseBuilder(false,null,error.message))
 }

	
});

function getUserUid(number) {
  const usersRef = db.collection('user').doc(number)
	   usersRef.get().then( (docSnapshot) => {

	   	if (docSnapshot.exists) {
	   		return docSnapshot.data().uid
	   	}
	   	return null
	 }).catch(err => {
	   	  throw handler(err)
	}) 
}

function responseBuilder(isSuccess,data,error="") {

	return response = {
			 Success : isSuccess,
			 error : error,
			 data : data
	  }
}


