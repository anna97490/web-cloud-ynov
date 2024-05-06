
import React, {useState, useEffect} from "react";
import "../firebaseConfig"
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

export default function Header() {
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

  const logout = () => {
    signOut(auth).then(() => {
      router.push("signin");
    });
  }

  return (
    <NavigationContainer independent={true}>
      <View style={styles.container}>
        <Link href="">Accueil</Link>
        {user ? <>
          <Link href="profile">Profil</Link>
          <Pressable onPress={logout}>
            <Text>Déconnexion</Text>
          </Pressable>
        </> : <>
          <Link href="signin">Connexion</Link>
          <Link href="signup">Inscription</Link>
        </>}

      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",
    backgroundColor: 'lightgrey',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
