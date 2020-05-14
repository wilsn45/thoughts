const Realm = require('realm');



//remove isMsgArchived
const Message95Schema = {
  name: 'Message95',
  properties: {
    msgid:  'string?',
    useruid: 'string',
    username : 'string',
    message : 'string?',
    image : 'string?',
    isLocalImage : 'bool?',
    isReceived : 'bool',
    thoughtTitle : 'string?',
    thoughtRef : 'string?',
    at : 'int',
    read : 'bool',
    isMsgArchived : 'bool?'
  }
};


export function addNewMessage(newMessage) {
  Realm.open({schema: [Message95Schema]})
    .then(realm => {

      const msg = realm.objects('Message95').filtered('msgid == $0',newMessage.msgid);
      // console.log("adding msg "+ JSON.stringify(newMessage))
      if(msg.length > 0) {
        console.log("ignoring msg "+msg)
        return
      }

      realm.write(() => {
         realm.create('Message95', {
              msgid:  newMessage.msgid,
              useruid: newMessage.useruid,
              username : newMessage.username,
              message : newMessage.message,
              isReceived : newMessage.isReceived,
              image : newMessage.image,
              isLocalImage : newMessage.isLocalImage,
              at : newMessage.at,
              isMsgArchived : false,
              read : !newMessage.isReceived
            });

        });
       // console.log("messagelist is "+JSON.stringify(realm.objects('Message95')))

      //realm.close();

  })
  .catch(error => {
      console.log("addNewMessage error "+error);
  });
}

export function deleteMsg(msgid) {
  Realm.open({schema: [Message95Schema]})
    .then(realm => {

      const msgFilter = realm.objects('Message95').filtered('msgid == $0',msgid);
      realm.write(() => {
         realm.delete(msgFilter);
       });
        console.log("messagelist is "+JSON.stringify(realm.objects('Message95')))
  })
  .catch(error => {
      console.log("addNewMessage error "+error);
  });
}

export function clearMSg(msgid) {
  Realm.open({schema: [Message95Schema]})
    .then(realm => {

      const allMSg = realm.objects('Message95')
      realm.write(() => {
         realm.delete(allMSg);
       });
      console.log("messagelist is "+JSON.stringify(realm.objects('Message95')))
  })
  .catch(error => {
      console.log("addNewMessage error "+error);
  });
}

export function getConversationList() {
return new Promise((resolve,reject) => {
  Realm.open({schema: [Message95Schema]})
    .then(realm => {

      let allMsg = realm.objects('Message95').filtered('TRUEPREDICATE SORT(at DESC) DISTINCT(useruid)')
      resolve(allMsg)
  })
  .catch(error => {
      console.log("addNewMessage error "+error);
      reject(error)
  });
});
}

export function getConversation(useruid) {
return new Promise((resolve,reject) => {
  Realm.open({schema: [Message95Schema]})
    .then(realm => {

      let allMsg = realm.objects('Message95').filtered('useruid == $0',useruid)
        // console.log("realm msg array is "+JSON.stringify(allMsg))
      resolve(allMsg)
  })
  .catch(error => {
      console.log("addNewMessage error "+error);
      reject(error)
  });
});
}

export function updateImageUrl(msgid,downloadUrl) {
  return new Promise((resolve,reject) => {
    Realm.open({schema: [Message95Schema]})
      .then(realm => {
        const msgFilter = realm.objects('Message95').filtered('msgid == $0',msgid);
        console.log("updating objects "+JSON.stringify(msgFilter))
        realm.write(() => {
           msgFilter[0].image = downloadUrl
         });
         console.log("after update "+JSON.stringify(msgFilter))
         resolve(true)
    })
    .catch(error => {
        console.log("addNewMessage error "+error);
        reject(error)
    });
  });
}

export function attachListner(updateMessage) {
  Realm.open({schema: [Message95Schema]})
    .then(realm => {
      realm.addListener('change', updateMessage);
  })
  .catch(error => {
      console.log("error is "+error)
  });
}
