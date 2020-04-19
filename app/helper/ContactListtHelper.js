import Contacts from 'react-native-contacts';

export function getUserContactList() {

  if (Platform.OS == 'ios') {
     return getContactListiOS()
   }else {
    return getContactListAndroid()
   }

}

function getContactListiOS() {
  try {
   Contacts.getAll((err, contacts) => {
     if (err) {
       throw err;
     }
     const phoneNumbersList = contacts.map((contact) => contact.phoneNumbers);
     var phoneNumberArray = []
     for(let i = 0; i < phoneNumbersList.length; i++) {
       phoneNumberArray = [].concat(phoneNumberArray,phoneNumbersList[i].map((number) => number.number))
     }
     return phoneNumberArray
    })
  }catch (error) {
  console.log(error)
 }
}

function getContactListAndroid() {

  PermissionsAndroid.request(
   PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
   {
     'title': 'Contacts',
     'message': 'This app would like to view your contacts.',
     'buttonPositive': 'Please accept bare mortal'
   }
   ).then(() => {
     Contacts.getAll((err, contacts) => {
       if (err === 'denied'){
             // error
           } else {
            console.log(contacts)
          }
        })
   })

 }
