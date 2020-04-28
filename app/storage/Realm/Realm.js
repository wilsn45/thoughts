const Realm = require('realm');

const FollowerSchema = {
  name: 'Follower',
  properties: {
    uid:  'string',
    username: 'string'
  }
};

const FollowingSchema = {
  name: 'Following',
  properties: {
    uid:  'string',
    username: 'string'
  }
};
const Schema = [FollowerSchema, FollowingSchema];
export function updateFollowers(followers) {
return new Promise((resolve,reject) => {
  Realm.open({schema: Schema})
    .then(realm => {
      realm.write(() => {
        let Followers = realm.objects('Follower');
        realm.delete(Followers);
        for (var user in followers) {
          realm.create('Follower', {
              uid: user,
              username: followings[user]
          });
        }
      });
      //realm.close();
      resolve(true)
  })
  .catch(error => {
      console.log(error);
      reject(error)
    });
});
}

export function updateFollowings(followings) {
return new Promise((resolve,reject) => {
  Realm.open({schema: Schema})
    .then(realm => {
      realm.write(() => {
        let Followings = realm.objects('Following');
        realm.delete(Followings);
        for (var user in followings) {
          realm.create('Following', {
              uid: user,
              username: followings[user]
          });
        }
      });
      //realm.close();
      resolve(true)

  })
  .catch(error => {
      console.log(error);
      reject(error)
    });
});
}


export function getFollowings() {
return new Promise((resolve,reject) => {
  Realm.open({schema: Schema})
  .then(realm => {
      const followings = realm.objects('Following');
      resolve(followings)
  })
  .catch(error => {
    console.log(error);
  });
});
}

export function getFollowers() {
return new Promise((resolve,reject) => {
  Realm.open({schema: Schema})
  .then(realm => {
      const followers = realm.objects('Follower');
      resolve(followers)
      //realm.close()
  })
  .catch(error => {
    console.log(error);
  });
});
}
//
// export function getFollowings() {
// return new Promise((resolve,reject) => {
//   Realm.open({schema: Schema})
//     .then(realm => {
//       const followings = realm.objects('Following');
//         realm.close();
//       resolve(followings)
//   })
//   .catch(error => {
//       console.log(error);
//       reject(error)
//     });
// });
// }
