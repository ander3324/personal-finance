import React from "react";
import { Text } from "react-native-elements";
import RNPickerSelect from "react-native-picker-select";

export const PeriodDropdown = () => {
  const selectedItem = {
    title: "Selected item title",
    description: "Secondary long descriptive text ...",
  };

  return (
    <RNPickerSelect
      onValueChange={(value) => console.log(value)}
      items={[
        { label: "Football", value: "football" },
        { label: "Baseball", value: "baseball" },
        { label: "Hockey", value: "hockey" },
      ]}
    >
      <Text>Seleccionar</Text>
    </RNPickerSelect>
  );
};
