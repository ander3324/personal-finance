import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

export default function DashboardButton() {
  
  const navigation = useNavigation();

  return (
    <TouchableHighlight 
      style={ styles.container }
      onPress= {
        () => {
          navigation.navigate("dashboard");
        }
      }   
    >
      <Icon name="home" color="#fff" size={30} />
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#25D366",
    alignItems: "center",
    justifyContent: "center",
    width: 72,
    height: 72,
    borderRadius: 36,
    top: -20,
    shadowRadius: 5,
    shadowOffset: { height: 10, width: 10 },
    shadowOpacity: 0.3,
    borderWidth: 1,
    borderColor: "#fff",
    padding: 20
  }  
});
