import React, {useState, useEffect} from "react";
import { StyleSheet, Text, View } from "react-native";
import { getPostData } from "../firebase/get_post_data";

export default function App() {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const data = await getPostData();
      console.log(data);
      setPosts(data);
    }
    fetchData();
  }, [])

  return (
    <View style={styles.container}>
      <Text>Bienvenue</Text>
      <Link href="newpost">Créer un nouveau post</Link>
      {posts.map((p) => {
        return (
          <View key={p.id} style={styles.item}>
            <Text style={styles.itemTitle}>{p.title}</Text>
            <Text>{p.text}</Text>
          </View>
        );
      })}
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
  item: {
    padding: 20,
    fontSize: 15,
    marginTop: 5,
    border: "1px solid blue"
  },
  itemTitle: {
    fontWeight: "bold"
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