import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput, Pressable, Alert } from "react-native";
import { signin } from "../../firebase/auth_signin_password";
import { signinWithGithub } from "../../firebase/auth_github_signin_popup";
import { loginWithPhoneNumber, verifyCode } from "../../firebase/auth_phone_signin";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {router} from "expo-router";

export default function Signin() {
    const auth = getAuth();
    const [email, onChangeEmail] = useState("");
    const [password, onChangePassword] = useState("");
    const [phoneNumber, onChangePhoneNumber] = useState("+");
    const [code, onChangeCode] = useState("");

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                router.push("profile");
            }
        });
    }, [])

    const confirmEmail = (email) => {
        const regex = /\S+@\S+\.\S+/;
        return regex.test(email);
    };

    const confirmPassword = (password) => {
        return password.length >= 6;
    };

    const confirmPhoneNumber = (phoneNumber) => {
        const regex = /^\+[1-9]\d{1,14}$/;
        return regex.test(phoneNumber);
    }

    const confirmForm = (email, password) => {
        return confirmEmail(email) && confirmPassword(password);
    }

    const handleSignin = async () => {
        if (confirmForm(email, password)) {
            signin(email, password);
            alert("User signed in successfully")
        } else {
            alert("Invalid email or password");
        }
    }

    const handleSigninPhone = async () => {
        if (confirmPhoneNumber(phoneNumber)) {
            await loginWithPhoneNumber(phoneNumber);
        } else {
            alert("Invalid phone number");
        }
    }

    const handlePhoneCode = async () => {
        await verifyCode(code);
    }

    return (
        <View style={styles.container}>
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
            <Pressable onPress={handleSignin} style = {styles.button}>
                <Text>Sign In!"</Text>
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
            <Pressable id="sign-in-button-phone" onPress={handleSigninPhone} style = {styles.button}>
                <Text>Sign In with Phone</Text>
            </Pressable>
            <div id="recaptcha-container"></div>
            <Text>Code</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeCode}
                value={code}
            ></TextInput>
            <Pressable onPress={handlePhoneCode} style = {styles.button}>
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
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 12,
        borderRadius: 5
    },
    buttonLabel: {
        color: 'white',
        fontWeight: 'bold'
    }
});
