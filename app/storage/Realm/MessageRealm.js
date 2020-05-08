const Realm = require('realm');
import * as  User  from "thoughts/app/User";
import * as userStorage from "thoughts/app/storage/Local/UserStorage";

const Chat3Schema = {
  name: 'Chat3',
  properties: {
    useruid:  'string',
    username: 'string',
    lastmessage : 'string',
    lastmessageat : 'int',
    message : 'Message3[]'
  }
};

const Message3Schema = {
  name: 'Message3',
  properties: {
    msdid:  'string',
    fromusername: 'string',
    fromuid : 'string',
    tousername : 'string',
    touid : 'string',
    message : 'string',
    thoughtTitle : 'string?',
    picRef : 'string?',
    audioRef : 'string?',
    at : 'int'
  }
};


const Schema = [Chat3Schema, Message3Schema];

export function addNewChat(newMessage) {
return new Promise((resolve,reject) => {
  Realm.open({schema: Schema})
    .then(realm => {
      const chat = realm.objects('Chat3').filtered('useruid == $0',newMessage.fromuid);

      // realm.write(() => {
      //   realm.delete(chat);
      if(chat.length>0) {
          addNewMessage(newMessage)
        }else {
         realm.write(() => {
          let newFrom = realm.create('Chat3', {
                lastmessage  : newMessage.message,
                lastmessageat : newMessage.at,
                useruid: newMessage.fromuid,
                username: newMessage.fromusername,
                message: []
            });
            addNewMessage(newMessage)
          });
        }
      // });
      console.log("chats is "+JSON.stringify(chat))

      //realm.close();
      resolve(true)
  })
  .catch(error => {
      console.log("addNewChat error "+error);
      reject(error)
    });
});
}

export async function addNewMessage(newMessage) {
  Realm.open({schema: Schema})
    .then(realm => {
      console.log("here i am 1 "+newMessage.message)
      const chat = realm.objects('Chat3').filtered('useruid == $0',newMessage.fromuid);

      const messages = chat[0].message

      let exists = messages.some(el => el.msdid === newMessage.msgid);
      if(exists) {
        console.log("message already added")
        return
      }
     console.log("here i am 2 "+newMessage.message)
     if(newMessage.at > User.messageLast) {
         User.messageLast = newMessage.at
         userStorage.setMessageLast(newMessage.at)
         console.log("updated time is "+User.messageLast)
     }

      // realm.delete(chat);
      realm.write(() => {
         console.log("here i am  3"+newMessage.message)
         chat[0].lastmessage  = newMessage.message
         chat[0].lastmessageat =  newMessage.at

            chat[0].message.push({
                msdid:  newMessage.msgid,
                fromusername: newMessage.fromusername,
                fromuid : newMessage.fromuid,
                tousername : newMessage.tousername,
                touid : newMessage.touid,
                message : newMessage.message,
                thoughtTitle : newMessage.thoughtTitle,
                picRef : newMessage.picRef,
                audioRef : newMessage.audioRef,
                at : newMessage.at
              })
        });
        console.log("chats is "+JSON.stringify(chat[0]))
        // console.log("messages is "+JSON.stringify(messages))
        // console.log("chats is "+JSON.stringify(chat))
        // console.log("new message added")


      //realm.close();

  })
  .catch(error => {
      console.log("addNewMessage error "+error);
  });
}
