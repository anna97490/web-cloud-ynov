import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import React from 'react';
import { signup } from './firebase/auth_signup_password'; 
import { signin } from './firebase/auth_signin_password'; 

export default function App() {
  const [email, onChangeEmail] = React.useState('');
  const [password, onChangePassword] = React.useState('');

  // Regex email
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  // Regex password
  // At least one upper case letter, one lower case letter, one digit, 6-20 characters
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

  // function to check the regex email
  const checkEmail = (email) => {
    return emailRegex.test(email);
  };

  // function to check the regex password
  const checkPassword = (password) => {
    return passwordRegex.test(password);
  };

  const handleSignup = () => {
    if (checkEmail(email) && checkPassword(password)) {
      signup(email, password);
      alert("User created successfully");
    }
    else {
      alert("Invalid email or password");
    }
  }

  const handleSignin = () => {
    if (checkEmail(email) && checkPassword(password)) {
      signin(email, password);
      alert("Signin success");
    }
    else {
      alert("Invalid email or password");
    }
  }

  return (
    <View style={styles.container}>
      <Text>Email</Text>
      <TextInput
        style={styles.input}
        onChangeText={text=>onChangeEmail(text)}
        value={email}
      ></TextInput>
      <Text>Password</Text>
      <TextInput
        style={styles.input}
        onChangeText={text=>onChangePassword(text)}
        value={password}
        secureTextEntry={true}
      ></TextInput>
      <Button title="Sign up" onPress={handleSignup}></Button>
      <Button title="Sign In" onPress={handleSignin}></Button>
    </View>
  );

    /*return (
    <View style={styles.container}>
      <Text>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        // Regex email
        onChangeText={text => {
          if (emailRegex.test(text)) {
            onChangeEmail(text);
          }
        }}
      ></TextInput>
      <Text>Password</Text>
      <TextInput
        style={styles.input}
         // Regex password
         onChangeText={text => {
          if (passwordRegex.test(text)) {
            onChangePassword(text);
          }
        }}
        value={password}
        secureTextEntry={true}
      ></TextInput>
      <Button title="Sign up" onPress={() => signup(email, password)}></Button>
      <Button title="Sign In" onPress={() => signin(email, password)}></Button>
    </View>
  );*/
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
  },
});
