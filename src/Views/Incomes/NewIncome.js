import React, { useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Input, Button, Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

//import DatePicker from "react-native-date-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment/min/moment-with-locales";

import Loading from "../../Components/Loading";
import { obtenerUsuario } from "../../Services/FirebaseService";
import { Keyboard } from "react-native";
import { TouchableWithoutFeedback } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function NewIncome() {
  const navigation = useNavigation();

  const [date, setDate] = useState(new Date());
  const [showDateDialog, setShowDateDialog] = useState(false);

  const showDatepicker = () => {
    setShowDateDialog(true);
  };

  const onChangeDate = (event, selectedDate) => {
    setShowDateDialog(false);
    const currentDate = selectedDate || date;
    //showDateDialog(Platform.OS === 'ios');
    setDate(currentDate);
  };

  return (
    <View>
      <Input placeholder="Descripcion" />
      <Input placeholder="Monto" keyboardType="number-pad" />
      <TouchableOpacity 
        onPressIn={showDatepicker}>
        <Input
          placeholder={"Fecha"}
          value={moment(date).format("DD/MM/YYYY")}
          editable={false}
        />
      </TouchableOpacity>
      {showDateDialog && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={"date"}
          display="default"
          onChange={onChangeDate}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
