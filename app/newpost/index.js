import React, {useState, useEffect} from "react";
import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import { createPost } from "../../firebase/add_post_data";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Error403 from "../../components/error403";

export default function NewPost() {
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [user, setUser] = useState(null)
    const auth = getAuth();

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
    }, [])

    if(user) {
        return (
            <View style={styles.container}>
                <Text>Title</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setTitle}
                    value={title}
                ></TextInput>
                <Text>Text</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setText}
                    value={text}
                ></TextInput>
                <Pressable onPress={() => createPost(title, text, user.uid)} style = {styles.button}>
                    <Text>Create new post</Text>
                </Pressable>
            </View>
        );
    } else {
        return (
            <Error403/>
        )
    }
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