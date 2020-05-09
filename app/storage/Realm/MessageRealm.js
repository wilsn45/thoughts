const Realm = require('realm');

const Message100Schema = {
  name: 'Message100',
  properties: {
    msgid:  'string',
    useruid: 'string',
    username : 'string',
    message : 'string',
    isReceived : 'bool',
    thoughtTitle : 'string?',
    picRef : 'string?',
    audioRef : 'string?',
    at : 'int',
    read : 'bool',
    isMsgArchived : 'bool?'
  }
};


export function addNewMessage(newMessage) {
  Realm.open({schema: [Message100Schema]})
    .then(realm => {

      const msg = realm.objects('Message100').filtered('msgid == $0',newMessage.msgid);

      if(msg.length > 0) {
        return
      }

      realm.write(() => {
         realm.create('Message100', {
              msgid:  newMessage.msgid,
              useruid: newMessage.useruid,
              username : newMessage.username,
              message : newMessage.message,
              isReceived : newMessage.isReceived,
              thoughtTitle : newMessage.thoughtTitle,
              picRef : newMessage.picRef,
              audioRef : newMessage.audioRef,
              at : newMessage.at,
              isMsgArchived : false,
              read : false
            });

        });
        console.log("messagelist is "+JSON.stringify(realm.objects('Message100')))

      //realm.close();

  })
  .catch(error => {
      console.log("addNewMessage error "+error);
  });
}

export function deleteMsg(msgid) {
  Realm.open({schema: [Message100Schema]})
    .then(realm => {

      const msgFilter = realm.objects('Message100').filtered('msgid == $0',msgid);
      realm.write(() => {
         realm.delete(msgFilter);
       });
        console.log("messagelist is "+JSON.stringify(realm.objects('Message100')))
  })
  .catch(error => {
      console.log("addNewMessage error "+error);
  });
}

export function clearMSg(msgid) {
  Realm.open({schema: [Message100Schema]})
    .then(realm => {

      const allMSg = realm.objects('Message100')
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
  Realm.open({schema: [Message100Schema]})
    .then(realm => {

      let allMsg = realm.objects('Message100').filtered('TRUEPREDICATE SORT(at DESC) DISTINCT(useruid)')
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
  Realm.open({schema: [Message100Schema]})
    .then(realm => {

      let allMsg = realm.objects('Message100').filtered('TRUEPREDICATE useruid = $0 SORT(at DESC)'.useruid)
      resolve(allMsg)
  })
  .catch(error => {
      console.log("addNewMessage error "+error);
      reject(error)
  });
});
}
