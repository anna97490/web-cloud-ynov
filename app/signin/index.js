import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput, Pressable, Alert } from "react-native";
import { signin } from "../../firebase/auth_signin_password";
import { signinWithGithub } from "../../firebase/auth_github_signin_popup";
import { loginWithPhoneNumber, verifyCode } from "../../firebase/auth_phone_signin";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

export default function Signin() {
    const auth = getAuth();
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("+");
    const [code, setCode] = useState("");

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                navigation.navigate("Profile");
            }
        });
        return unsubscribe;  
    }, []);

    const handleSignin = async () => {
        if (email.match(/\S+@\S+\.\S+/) && password.length >= 6) {
            try {
                await signin(email, password);
                Alert.alert("Success", "User signed in successfully");
            } catch (error) {
                Alert.alert("Sign in failed", error.errorMessage);
            }
        } else {
            Alert.alert("Validation Error", "Invalid email or password");
        }
    };

    const handleSigninPhone = async () => {
        if (phoneNumber.match(/^\+[1-9]\d{1,14}$/)) {
            try {
                await loginWithPhoneNumber(phoneNumber);
            } catch (error) {
                Alert.alert("Phone sign in failed", error.message);
            }
        } else {
            Alert.alert("Validation Error", "Invalid phone number");
        }
    };

    const handlePhoneCode = async () => {
        try {
            await verifyCode(code);
        } catch (error) {
            Alert.alert("Code verification failed", error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text>Email</Text>
            <TextInput
                style={styles.input}
                onChangeText={setEmail}
                value={email}
                placeholder="Enter your email"
            />
            <Text>Password</Text>
            <TextInput
                style={styles.input}
                onChangeText={setPassword}
                value={password}
                secureTextEntry={true}
                placeholder="Enter your password"
            />
            <Pressable onPress={handleSignin} style={styles.button}>
                <Text style={styles.buttonLabel}>Sign In!</Text>
            </Pressable>
            <Text>___GitHub___</Text>
            <Pressable onPress={signinWithGithub} style={styles.button}>
                <Text style={styles.buttonLabel}>Sign In with Github</Text>
            </Pressable>
            <Text>___Phone___</Text>
            <Text>Phone number</Text>
            <TextInput
                style={styles.input}
                onChangeText={setPhoneNumber}
                value={phoneNumber}
                placeholder="Enter your phone number"
            />
            <Pressable onPress={handleSigninPhone} style={styles.button}>
                <Text style={styles.buttonLabel}>Sign In with Phone</Text>
            </Pressable>
            <Text>Code</Text>
            <TextInput
                style={styles.input}
                onChangeText={setCode}
                value={code}
                placeholder="Verification code"
            />
            <Pressable onPress={handlePhoneCode} style={styles.button}>
                <Text style={styles.buttonLabel}>Check Code!</Text>
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
