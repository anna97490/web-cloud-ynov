import {getAuth, onAuthStateChanged} from "firebase/auth";
import {useEffect} from "react";
import {router} from "expo-router";

const authRedirectProfile = () => {
    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                router.navigate('/profile');
            }
        });
        return () => unsubscribe();
    }, []);
}

export default authRedirectProfile;