import React, { useState, useEffect } from "react";
import "../../firebaseConfig"
import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import { useLocalSearchParams } from 'expo-router';
import { getOnePostData } from "../../firebase/get_one_post_data";
export default function Post() {
  const [post, setPost] = useState(null)

  const local = useLocalSearchParams();

  useEffect(() => {
    const fetchPost = async () => {
      let res = await getOnePostData(local.postId);
      console.log(res);
      setPost(res);
    }
    fetchPost();
  }, [local.postId])

  if (post) {
    return (
      <View style={styles.container}>
        <Text>Title : {post.title}</Text>
        <Text>Text : {post.text}</Text>
      </View>
    );
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