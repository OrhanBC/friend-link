const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.newUserSignup = functions.https.onCall(async (data, context) => {
  return await admin
      .firestore()
      .collection("users")
      .doc(context.auth.uid)
      .set({
        email: data.email,
        imageURL: "",
        username: data.username,
        posts: [],
        friends: [],
        likes: [],
        requests: [],
      });
});

exports.usernameExists = functions.https.onCall(async (data, context) => {
  if (!data.username) {
    throw new functions.https
        .HttpsError("invalid-argument", "Username is required.");
  }

  const usersQuery = await admin
      .firestore()
      .collection("users")
      .where("username", "==", data.username)
      .get();

  console.log("Query Result:", usersQuery.docs.map((doc) => doc.data()));
  console.log(data.username);

  console.log(usersQuery.docs.length);
  return usersQuery.docs.length > 0;
});

exports.setUsername = functions.https.onCall(async (data, context) => {
  return await admin
      .firestore()
      .collection("users")
      .doc(context.auth.uid)
      .update({
        username: data.username,
      });
});

exports.updateImageURL = functions.https.onCall(async (data, context) => {
  return await admin
      .firestore()
      .collection("users")
      .doc(context.auth.uid)
      .update({
        imageURL: data.url,
      });
});

exports.sendFriendRequest = functions.https.onCall(async (data, context) => {
  const snapshot = await admin
      .firestore()
      .collection("users")
      .doc(data.id)
      .get();
  const requests = snapshot.data().requests;
  requests.push(context.auth.uid);
  return await admin
      .firestore()
      .collection("users")
      .doc(data.id)
      .update({
        requests,
      });
});

exports.addFriend = functions.https.onCall(async (data, context) => {
  const userSnapshot = await admin
      .firestore()
      .collection("users")
      .doc(context.auth.uid)
      .get();
  const requests = userSnapshot.data().requests;
  const userFriends = userSnapshot.data().friends;
  requests.splice(data.index, 1);
  userFriends.push(data.id);

  const requesteeSnapshot = await admin
      .firestore()
      .collection("users")
      .doc(data.id)
      .get();
  const requesteeFriends = requesteeSnapshot.data().friends;
  requesteeFriends.push(context.auth.uid);

  await admin
      .firestore()
      .collection("users")
      .doc(data.id)
      .update({
        friends: requesteeFriends,
      });

  return await admin
      .firestore()
      .collection("users")
      .doc(context.auth.uid)
      .update({
        friends: userFriends,
        requests,
      });
});

exports.removeFriendRequest = functions.https.onCall(async (data, context) => {
  const snapshot = await admin
      .firestore()
      .collection("users")
      .doc(context.auth.uid)
      .get();

  const requests = snapshot.data().requests;
  requests.splice(data.index, 1);

  return await admin
      .firestore()
      .collection("users")
      .doc(context.auth.uid)
      .update({
        requests,
      });
});

exports.createPost = functions.https.onCall(async (data, context) => {
  const timestamp = admin.firestore.FieldValue.serverTimestamp();
  const post = await admin
      .firestore()
      .collection("posts")
      .doc();
  const snapshot = await admin
      .firestore()
      .collection("users")
      .doc(context.auth.uid)
      .get();
  let posts = snapshot.data().posts;
  posts = [post.id, ...posts];
  await admin
      .firestore()
      .collection("users")
      .doc(context.auth.uid)
      .update({
        posts,
      });
  return await post
      .set({
        userID: context.auth.uid,
        imageURL: data.url,
        description: data.description,
        likes: [],
        createdAt: timestamp,
        id: post.id,
      });
});

exports.like = functions.https.onCall(async (data, context) => {
  const snapshot = await admin
      .firestore()
      .collection("users")
      .doc(context.auth.uid)
      .get();
  const likes = snapshot.data().likes;
  likes.push(data.id);
  await admin
      .firestore()
      .collection("users")
      .doc(context.auth.uid)
      .update({
        likes,
      });
  const postSnapshot = await admin
      .firestore()
      .collections("posts")
      .doc(data.id)
      .get();
  const postLikes = postSnapshot.data().likes;
  postLikes.push(context.auth.uid);
  return await admin
      .firestore()
      .collection("posts")
      .doc(data.id)
      .update({
        likes: postLikes,
      });
});

exports.unlike = functions.https.onCall(async (data, context) => {
  const snapshot = await admin
      .firestore()
      .collection("users")
      .doc(context.auth.uid)
      .get();
  const likes = snapshot.data().likes;
  likes.splice(data.id, 1);
  await admin
      .firestore()
      .collection("users")
      .doc(context.auth.uid)
      .update({
        likes,
      });
  const postSnapshot = await admin
      .firestore()
      .collection("posts")
      .doc(data.id)
      .get();
  const postLikes = postSnapshot.data().likes;
  postLikes.splice(context.auth.uid, 1);
  return await admin
      .firestore()
      .collection("posts")
      .doc(data.id)
      .update({
        likes: postLikes,
      });
});
