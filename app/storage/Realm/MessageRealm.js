const Realm = require('realm');


//message optional
//rename picRef
//remove archive
const Message96Schema = {
  name: 'Message96',
  properties: {
    msgid:  'string?',
    useruid: 'string',
    username : 'string',
    message : 'string?',
    isReceived : 'bool',
    thoughtTitle : 'string?',
    image : 'string?',
    at : 'int',
    read : 'bool',
    isMsgArchived : 'bool?'
  }
};


export function addNewMessage(newMessage) {
  Realm.open({schema: [Message96Schema]})
    .then(realm => {

      const msg = realm.objects('Message96').filtered('msgid == $0',newMessage.msgid);
      console.log("adding msg "+ newMessage)
      if(msg.isReceived && msg.length > 0) {
        console.log("ignoring msg "+msg)
        return
      }

      realm.write(() => {
         realm.create('Message96', {
              msgid:  newMessage.msgid,
              useruid: newMessage.useruid,
              username : newMessage.username,
              message : newMessage.message,
              isReceived : newMessage.isReceived,
              thoughtTitle : newMessage.thoughtTitle,
              image : newMessage.image,
              at : newMessage.at,
              isMsgArchived : false,
              read : !newMessage.isReceived
            });

        });
      //  console.log("messagelist is "+JSON.stringify(realm.objects('Message96')))

      //realm.close();

  })
  .catch(error => {
      console.log("addNewMessage error "+error);
  });
}

export function deleteMsg(msgid) {
  Realm.open({schema: [Message96Schema]})
    .then(realm => {

      const msgFilter = realm.objects('Message96').filtered('msgid == $0',msgid);
      realm.write(() => {
         realm.delete(msgFilter);
       });
        console.log("messagelist is "+JSON.stringify(realm.objects('Message96')))
  })
  .catch(error => {
      console.log("addNewMessage error "+error);
  });
}

export function clearMSg(msgid) {
  Realm.open({schema: [Message96Schema]})
    .then(realm => {

      const allMSg = realm.objects('Message96')
      realm.write(() => {
         realm.delete(allMSg);
       });

  })
  .catch(error => {
      console.log("addNewMessage error "+error);
  });
}

export function getConversationList() {
return new Promise((resolve,reject) => {
  Realm.open({schema: [Message96Schema]})
    .then(realm => {

      let allMsg = realm.objects('Message96').filtered('TRUEPREDICATE SORT(at DESC) DISTINCT(useruid)')
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
  Realm.open({schema: [Message96Schema]})
    .then(realm => {

      let allMsg = realm.objects('Message96').filtered('useruid == $0',useruid)
      resolve(allMsg)
  })
  .catch(error => {
      console.log("addNewMessage error "+error);
      reject(error)
  });
});
}

export function attachListner(updateMessage) {
  Realm.open({schema: [Message96Schema]})
    .then(realm => {
      realm.addListener('change', updateMessage);
  })
  .catch(error => {
      console.log("error is "+error)
  });
}
