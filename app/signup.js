import React from "react";
// import "../firebaseConfig"
import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import { signup } from "../firebase/auth_signup_password";
import { signInWithFacebook } from "../firebase/auth_facebook_signin_popup"
import { signinWithGithub } from "../firebase/auth_github_signin_popup";
import { loginWithPhoneNumber } from "../firebase/auth_phone_signin";
import { verifyCode } from "../firebase/auth_phone_verify_code";
// import Toast from 'react-native-root-toast';
// import SnackBar from 'react-native-snackbar-component'
export default function Signup() {
  // let toast = Toast.show('Request failed to send.', {
  //   duration: Toast.durations.LONG,
  // });

  // You can manually hide the Toast, or it will automatically disappear after a `duration` ms timeout.
  // setTimeout(function hideToast() {
  //   Toast.hide(toast);
  // }, 500);

  const [email, onChangeEmail] = React.useState("");
  const [password, onChangePassword] = React.useState("");
  const [phoneNumber, onChangePhoneNumber] = React.useState("");
  const [code, onChangeCode] = React.useState("");

  return (
    <View style={styles.container}>
      {/* <Toast visible={true}>Thanks for subscribing!</Toast> */}
      <Text>Email</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeEmail}
        value={email}
      ></TextInput>
      <Text>Password</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangePassword}
        value={password}
        secureTextEntry={true}
      ></TextInput>
      <Pressable onPress={() => signup(email, password)} style = {styles.button}>
        <Text>Sign Up!</Text>
      </Pressable>
      <Text>____Facebook_____</Text>
      <Pressable onPress={() => signInWithFacebook()} style = {styles.button}>
        <Text>Sign In with Facebook</Text>
      </Pressable>
      <Text>____Github_____</Text>
      <Pressable onPress={() => signinWithGithub()} style = {styles.button}>
        <Text>Sign In with Github</Text>
      </Pressable>

      <Text>____Phone_____</Text>
      <Text>Phone number</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangePhoneNumber}
        value={phoneNumber}
      ></TextInput>
      <Pressable id="sign-in-button-phone" onPress={() => loginWithPhoneNumber(phoneNumber)} style = {styles.button}>
        <Text>Sign In with Phone</Text>
      </Pressable>
      <div id="recaptcha-container"></div>
      <Text>Code</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeCode}
        value={code}
      ></TextInput>
      <Pressable onPress={() => verifyCode(code)} style = {styles.button}>
        <Text>Check Code !</Text>
      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  input: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10
  },
  button: {
    backgroundColor: 'blue',
    minWidth: 100,
    minHeight: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonLabel: {
    color: 'white',
    fontWeight: 700
  }
});