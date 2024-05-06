import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';
export default function Error403() {
  return (
    <NavigationContainer independent={true}>
      <View style={styles.container}>
        <Text>Seuls les utilisateurs connectés peuvent accéder à cette page</Text>
        <Link href="signin">Inscription</Link>
        <Link href="signup">Connexion</Link>
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