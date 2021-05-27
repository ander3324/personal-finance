import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native'

export default function EditExpense(props) {

    const { route } = props;
    const { item } = route.params;

    return (
        <View>
            <Text></Text>
        </View>
    )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 5,
    margin: 5,
    padding: 5,
    elevation: 5,
  },
  input: {
    width: "90%",
    borderRadius: 10,
    borderColor: "#707070",
    marginTop: 0,
    paddingHorizontal: 0,
    height: 50,
  },
  textArea: {
    height: 100,
  },
  btnAdd: {
    marginTop: 20,
    marginBottom: 20,
    marginHorizontal: 20,
  },
  btnCancel: {
    marginBottom: 20,
    marginHorizontal: 20,
    backgroundColor: "#aeaeae",
  },
  txtLabel: {
    fontSize: 18,
    fontFamily: "Roboto",
    marginLeft: 10,
    marginTop: 20,
    color: "#8d8d8d",
  },
  botonera: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  btnCategoria: {
    justifyContent: "center",
    alignItems: "center",
  },
});
