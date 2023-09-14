import { useState } from "react";
import { firestore, functions } from "../lib/firebase";

export function useFriendsPosts(friends) {
    const [posts, setPosts] = useState([]);
    firestore.collection("posts").orderBy("createdAt", "desc").get().then(snapshot => {
        const posts = [];
        snapshot.forEach((doc) => {
            if (friends.includes(doc.data().userID)) {
                posts.push(doc.data());
            }
        })
        setPosts(posts);
    });
    return { posts }
}

export function usePost(id) {
    const [post, setPost] = useState();
    firestore.collection("posts").doc(id).get().then(snapshot => {
        setPost(snapshot.data());
    })
    async function likePost(){
        const like = functions.httpsCallable("like");
        await like({ id });
    }
    async function unlikePost(){
        const unlike = functions.httpsCallable("unlike");
        await unlike({ id });
    }
    return { post, likePost, unlikePost }
}