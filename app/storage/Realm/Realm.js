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

const ShowOnlySchema = {
  name: 'ShowOnly',
  properties: {
    uid:  'string',
    username: 'string'
  }
};

const ShowExceptSchema = {
  name: 'ShowExcept',
  properties: {
    uid:  'string',
    username: 'string'
  }
};

const ShowSchema = {
  name: 'Show',
  properties: {
    uid:  'string',
    username: 'string'
  }
};

const Schema = [FollowerSchema, FollowingSchema,ShowOnlySchema,ShowExceptSchema,ShowSchema];

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
              username: followers[user]
          });
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
      console.log("updateFollowings error "+error);
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
    console.log("getFollowings error "+error);
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
    console.log("getFollowers error "+error);
  });
});
}

export function updateShowOnly(users) {
return new Promise((resolve,reject) => {
  Realm.open({schema: Schema})
    .then(realm => {
      realm.write(() => {
        let usersList = realm.objects('ShowOnly');
        realm.delete(usersList);
        for (var user in users) {
          realm.create('ShowOnly', {
              uid: user.uid,
              username: user.username
          });
        }
      });
      //realm.close();
      resolve(true)

  })
  .catch(error => {
      console.log("updateShowOnly error "+error);
      reject(error)
    });
});
}


export function getShowOnly() {
return new Promise((resolve,reject) => {
  Realm.open({schema: Schema})
  .then(realm => {
      const user = realm.objects('ShowOnly');
      resolve(user)
  })
  .catch(error => {
  console.log("getShowOnly error "+error);
  });
});
}

export function updateShowExcept(users) {
return new Promise((resolve,reject) => {
  Realm.open({schema: Schema})
    .then(realm => {
      realm.write(() => {
        let usersList = realm.objects('ShowExcept');
        realm.delete(usersList);
        for (var user in users) {
          realm.create('ShowExcept', {
              uid: user.uid,
              username: user.username
          });
        }
      });
      //realm.close();
      resolve(true)
  })
  .catch(error => {
        console.log("updateShowExcept error "+error);
      reject(error)
    });
});
}


export function getShowExcept() {
return new Promise((resolve,reject) => {
  Realm.open({schema: Schema})
  .then(realm => {
      const user = realm.objects('ShowExcept');
      resolve(user)
  })
  .catch(error => {
    console.log("getShowExcept error "+error);
  });
});
}
