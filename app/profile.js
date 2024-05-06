import React from "react";
import { StyleSheet, Text, View, Image, Button } from "react-native";
import "../firebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import * as ImagePicker from 'expo-image-picker';
import { uploadToFirebase } from "../firebase/storage_upload_file";
import { updateUserPhotoUrl } from "../firebase/auth_update_photo_url";

export default function Profile() {
    const [user, setUser] = React.useState(null)
    const [image, setImage] = React.useState(null);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);

            const { uri } = result.assets[0];
            const fileName = uri.split("/").pop();
            const uploadResp = await uploadToFirebase(uri, fileName);
            let res = await updateUserPhotoUrl(uploadResp);
            if (res) {
                console.log(res);
                setUser({ ...user, photoURL: uploadResp })
            } else {
                // An error occurred
                // ...
            };
        }
    };

    const auth = getAuth();
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
                    <Button title="Pick an image from camera roll" onPress={pickImage} />
                    {image && <Image source={{ uri: image }} style={styles.image} />}
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