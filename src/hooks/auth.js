import { useState, useEffect } from "react";
import { auth, functions } from "../lib/firebase";
import { DASHBOARD, LOGIN } from "../lib/routes";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

export function useLogin() {
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();
    async function login({ email, password, redirectTo = DASHBOARD}) {
        setLoading(true);
        try {
            await auth.signInWithEmailAndPassword(email, password);
            toast.success('You are successfully loged in!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
                navigate(redirectTo);
        } catch (error) {
            console.log(error.message)
            toast.error(error.message, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
                setLoading(false);
        } finally {
            setLoading(false);
        }
    }

    return { login, isLoading };

}

export function useSignup() {
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();
    async function signup({ username, email, password, redirectTo = DASHBOARD}) {
        setLoading(true);
        const usernameExists = functions.httpsCallable("usernameExists");
        const usernameExistsResult = await usernameExists({ username });

        if (usernameExistsResult.data) {
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
                setLoading(false);
        } else {
            try {
                const res = await auth.createUserWithEmailAndPassword(email, password);
                const newUserSignup = functions.httpsCallable("newUserSignup");
                await newUserSignup({ username, email })
                toast.success('Account successfully created!', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
                    navigate(redirectTo);
            } catch (error) {
                toast.error(error.message, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
                    setLoading(false);
            } finally {
                setLoading(false);
            }
        }
    }

    return { signup, isLoading };
}

export function useLogout() {
    const navigate = useNavigate();
    async function logout() {
        try {
            await auth.signOut()
            toast.success('Successfully logged out', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
                navigate(LOGIN);
        } catch(error) {
            toast.error(error.message, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        }
    }

    return { logout };
}
