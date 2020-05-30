const Realm = require('realm');

const PROFILE_SCHEMA  = 'Profile99'
const USER_SCHEMA = 'User99'

const Profile99Schema = {
  name: 'Profile99',
  properties: {
    followers:  'User99[]',
    followings:  'User99[]',
    pendings:  'User99[]',
    blocked:  'User99[]',
    isPrivate : 'bool'
  }
};

const User99Schema = {
  name: 'User99',
  properties: {
    uid:  'string',
    username: 'string'
  }
};

const Schema = [Profile99Schema, User99Schema];

export function updateProfileData(data) {
return new Promise((resolve,reject) => {
  Realm.open({schema: Schema})
    .then(realm => {
      realm.write(() => {
        let oldProfile = realm.objects('Profile99');
        realm.delete(oldProfile);
        let newProfile = realm.create('Profile99', {
              followers: [],
              followings: [],
              pendings : [],
              blocked : [],
              isPrivate : data.isPrivate
          });
          let followers = newProfile.followers;
          let followings = newProfile.followings;
          let pendings = newProfile.pendings;
          let blocked = newProfile.blocked;

          for (var user in data.followers) {
            followers.push({uid: user, username: data.followers[user]});
          }

          for (var user in data.followings) {
            followings.push({uid: user, username: data.followings[user]});
          }

          for (var user in data.pendings) {
            pendings.push({uid: user, username: data.pendings[user]});
          }

          for (var user in data.blocked) {
            blocked.push({uid: user, username: data.blocked[user]});
          }
      });
      //realm.close();
      resolve(true)
  })
  .catch(error => {
      console.log("updateFollowers error "+error);
      reject(error)
    });
});
}


export function getProfileData() {
return new Promise((resolve,reject) => {
  Realm.open({schema: Schema})
  .then(realm => {
      const profile = realm.objects('Profile99');
      resolve(profile[0])
  })
  .catch(error => {
    console.log("getProfileData error "+error);
  });
});
}
