import "../firebaseConfig";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

export const signup = async (email, password) => {
    await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            console.log("User created successfully");
            return user;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
}