import { useState } from "react";
import { toast } from "react-toastify";
import { firestore, functions, storage } from "../lib/firebase";

export function useUser(id) {
    const [user, setUser] = useState();
    const [requestLoading, setRequestLoading] = useState(false);
    const [usernameLoading, setUsernameLoading] = useState(false);
    const [imageLoading, setImageLoading] = useState(false);
    const [postLoading, setPostLoading] = useState(false);
    firestore.collection("users").doc(id).get().then(snapshot => {
        setUser(snapshot.data());
    });
    async function sendRequest() {
        setRequestLoading(true);
        const sendFriendRequest = functions.httpsCallable("sendFriendRequest");
        await sendFriendRequest({ id });
        setRequestLoading(false);
    }
    async function acceptRequest(index) {
        setRequestLoading(true);
        const addFriend = functions.httpsCallable("addFriend");
        await addFriend({ id, index });
        setRequestLoading(false);
    }
    async function declineRequest(index) {
        setRequestLoading(true);
        const removeFriendRequest = functions.httpsCallable("removeFriendRequest");
        await removeFriendRequest({ index });
        setRequestLoading(false);
    }
    async function changeUsername(username) {
        setUsernameLoading(true);
        const setUsername = functions.httpsCallable("setUsername");
        const usernameExists = functions.httpsCallable("usernameExists");
        if (!(await usernameExists({ username })).data) await setUsername({ username });
        else {
            toast.error("Username already exists", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
                setUsernameLoading(false);
        }
        setUsernameLoading(false);
    }
    async function changeProfilePicture(image, currentURL) {
        setImageLoading(true);
        const updateImageURL = functions.httpsCallable("updateImageURL");
        const uploadTask = storage
        .ref(`images/${id}/profile-picture`)
        .put(image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref("images")
            .child(id)
            .child("profile-picture")
            .getDownloadURL()
            .then((url) => {
              if (currentURL !== url) {
                updateImageURL({ url });
              }
            });
        }
      );
        setImageLoading(false);
    }
    async function makePost(description, image) {
        setPostLoading(true);
        const createPost = functions.httpsCallable("createPost");
        const date = new Date();
        const uploadTask = storage
        .ref(`images/${id}/posts/${image.name}${date}`)
        .put(image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref("images")
            .child(id)
            .child("posts")
            .child(`${image.name}${date}`)
            .getDownloadURL()
            .then((url) => {
              createPost({ url, description })
            });
        }
      );
      toast.success("Successfully created the post", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      setPostLoading(false);
        
    }
    return { user, sendRequest, acceptRequest, declineRequest, changeUsername, changeProfilePicture, makePost, requestLoading, usernameLoading, imageLoading, postLoading }
}

export function useUsers(id = "") {
    const [users, setUsers] = useState();
    firestore.collection("users").get().then(snapshot => {
        const users = [];
        snapshot.forEach((doc) => {
            if (doc.id !== id) {
                users.push({ id: doc.id, ...doc.data() });
            }
        })
        setUsers(users);
    })
    return { users }
}