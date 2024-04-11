export const verifyCode = async (code) => {
  window.confirmationResult.confirm(code).then((result) => {
    // User signed in successfully.
    const user = result.user;
    console.log(user);
    console.log("signin with phone success");
    return true;
    // ...
  }).catch((error) => {
    // User couldn't sign in (bad verification code?)
    // ...
    console.log("signin with phone failed");
    console.log(error);
    return false;
  });
};