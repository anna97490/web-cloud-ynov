import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Image, Pressable, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { signup } from "../../firebase/auth_signup_password";
import * as ImagePicker from "expo-image-picker";
import { getAuth } from "firebase/auth";
import { uploadToFirebase } from "../../firebase/storage_upload_file";
import { updateProfileInfos } from "../../firebase/auth_update_infos";

export default function Signup() {
    const auth = getAuth();
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [image, setImage] = useState(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
    const validatePassword = (password) => password.length >= 6;
    const validateUsername = (username) => /^[a-zA-Z0-9]+$/.test(username);

    const handleSignup = async () => {
        if (validateEmail(email) && validatePassword(password) && validateUsername(username)) {
            try {
                await signup(email, password);
                const fileName = image.split("/").pop();
                const uploadResp = await uploadToFirebase(image, fileName);
                await updateProfileInfos(uploadResp, username);
                Alert.alert("Success", "User created successfully");
                navigation.navigate("Profile");
            } catch (error) {
                Alert.alert("Error", error.message);
            }
        } else {
            Alert.alert("Error", "Invalid email, password, or username");
        }
    };

    return (
        <View style={styles.container}>
            <TextInput style={styles.input} onChangeText={setEmail} value={email} placeholder="Email" />
            <TextInput style={styles.input} onChangeText={setPassword} value={password} secureTextEntry={true} placeholder="Password" />
            <TextInput style={styles.input} onChangeText={setUsername} value={username} placeholder="Username" />
            <Text>Profile picture (optional)</Text>
            <Pressable onPress={pickImage} style={styles.button}>
                <Text style={styles.buttonLabel}>Choose Image</Text>
            </Pressable>
            {image && <Image source={{ uri: image }} style={styles.image} />}
            <Pressable onPress={handleSignup} style={styles.button}>
                <Text style={styles.buttonLabel}>Sign Up!</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        padding: 20
    },
    input: {
        height: 40,
        width: '100%',
        marginVertical: 8,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5
    },
    button: {
        backgroundColor: 'blue',
        width: '100%',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 8,
        borderRadius: 5
    },
    buttonLabel: {
        color: 'white',
        fontWeight: 'bold'
    },
    image: {
        width: 200,
        height: 200,
        marginVertical: 8
    }
});
