import React from "react";
import { StyleSheet, View, text } from "react-native";
import { Text } from "react-native-elements";
import RNPickerSelect from "react-native-picker-select";

export const PeriodDropdown = () => {
  

  const selectedItem = (value) => {
    switch(value) {
      case 0:
        console.log("Todos");
        break;
      case 1:
        console.log("Ultimo");
        break;
      case 2:
        console.log("Anterior");
        break;
    }
  };

  return (
    <RNPickerSelect
      onValueChange={(value) => console.log(value)}
      pickerProps={{
        accessibilityLabel: selectedItem.title,
      }}
      items={[
        { label: "Todos", value: 0 },
        { label: "Último mes", value: 1 },
        { label: "Mes anterior", value: 2 },
      ]}
    >
      <Text style={styles.container}>Seleccionar período</Text>
    </RNPickerSelect>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "flex-end",
    marginEnd: 50,
    padding: 5,
    fontSize: 15,
    fontWeight: "bold",
  },
});
