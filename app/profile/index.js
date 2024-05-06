import React, {useEffect} from "react";
import {StyleSheet, Text, View, Image, Pressable, TextInput} from "react-native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import * as ImagePicker from 'expo-image-picker';
import { uploadToFirebase } from "../../firebase/storage_upload_file";
import { updateProfileInfos } from "../../firebase/auth_update_infos";

export default function Profile() {
    const auth = getAuth();
    const [user, setUser] = React.useState(null)
    const [image, setImage] = React.useState(null);
    const [username, onChangeUsername] = React.useState("");
    const [fileName, setFileName] = React.useState("");

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            const { uri } = result.assets[0];
            setFileName(uri.split("/").pop());
        }
    };

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/auth.user
                console.log(user)
                setUser(user);
                // ...
            } else {
                // User is signed out
                // ...
                setUser(null);
            }
        });
    }, []);

    const handleUpdateProfile = async () => {
        const uploadResp = await uploadToFirebase(image, fileName);
        await updateProfileInfos(uploadResp, username);
        setUser({...user, displayName: username, photoURL: uploadResp});
    }

    return (
        <>
            {user ?
                <View style={styles.container}>
                    <Text>Display name : {user.displayName}</Text>
                    <Text>Email : {user.email}</Text>
                    <Text>phoneNumber : {user.phoneNumber}</Text>
                    <Text>Profile picture :</Text>
                    <Image
                        style={styles.image}
                        source={{
                            uri: user.photoURL,
                        }}
                    />

                    <View style={{borderTopWidth: 1, borderTopColor: "black", padding: "20px"}}>
                        <Text>Modify display name :</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={onChangeUsername}
                            value={username}
                        />
                        <Text>Update profile picture :</Text>
                        <Pressable onPress={pickImage} style={styles.button}>
                            <Text>Pick an image from camera roll</Text>
                        </Pressable>
                        {image && <Image source={{ uri: image }} style={styles.image} />}
                        <Pressable onPress={handleUpdateProfile} style={styles.button}>
                            <Text>Update profile</Text>
                        </Pressable>
                    </View>
                </View>
                :
                <View style={styles.container}>
                    <Text>User not logged ... </Text>
                </View>}
        </>
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
    },
    image: {
        width: 200,
        height: 200,
    },
});