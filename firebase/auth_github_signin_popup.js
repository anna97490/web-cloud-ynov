import { getAuth, signInWithPopup, GithubAuthProvider } from "firebase/auth";
import { provider } from "./auth_github_provider_create";

const auth = getAuth();
export const signinGithub = () => {
    console.log("signin with github")
    signInWithPopup(auth, provider)
    .then((result) => {
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user);
        console.log("signin with github success");
    }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GithubAuthProvider.credentialFromError(error);
        console.log(errorCode, errorMessage);
    });
}