import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StatusBar,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  Alert
} from "react-native";
import { Icon } from "react-native-elements";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import { size } from "lodash";
import moment from "moment/min/moment-with-locales";
import { useWindowDimensions } from "react-native";
import { findAllIncomes } from "../../Services/FirebaseService";

export default function Incomes() {

  moment.locale("es");
  const navigation = useNavigation();

  const [incomes, setIncomes] = useState({});

      async () => setIncomes(await findAllIncomes());
  console.log(
    incomes
  );
  /* useEffect(() => {
    (async () => {
      setIncomes(await findAllIncomes());
    })();
  }, []);

 
  useFocusEffect(
    useCallback(() => {
      (async () => {
        setIncomes(await findAllIncomes());
      })();
    }, [])
  ); */

  /* const incomes = [
    {
      key: 1,
      fecha: moment(new Date()).format("dd DD MMM YY"),
      concepto: "Sueldo Mensual",
      monto: 120000,
      categoria: "Sueldos",
    },
    {
      key: 2,
      fecha: moment(new Date()).format("dd DD MMM YY"),
      concepto: "Aguinaldo",
      monto: 60000,
      categoria: "Sueldos",
    },
    {
      key: 3,
      fecha: moment(new Date()).format("dd DD MMM YY"),
      concepto: "Cobro App",
      monto: 360000,
      categoria: "Sueldos",
    },
    {
      key: 4,
      fecha: moment(new Date()).format("dd DD MMM YY"),
      concepto: "Ingreso Alquiler",
      monto: 120000,
      categoria: "Sueldos",
    },
    {
      key: 5,
      fecha: moment(new Date()).format("dd DD MMM YY"),
      concepto: "Sueldo Mensual",
      monto: 120000,
      categoria: "Sueldos",
    },
    {
      key: 6,
      fecha: moment(new Date()).format("dd DD MMM YY"),
      concepto: "Aguinaldo",
      monto: 60000,
      categoria: "Sueldos",
    },
    {
      key: 7,
      fecha: moment(new Date()).format("dd DD MMM YY"),
      concepto: "Cobro App",
      monto: 360000,
      categoria: "Sueldos",
    },
    {
      key: 8,
      fecha: moment(new Date()).format("dd DD MMM YY"),
      concepto: "Ingreso Alquiler",
      monto: 120000,
      categoria: "Sueldos",
    },
  ]; */

  

  return (
    <View style = {{ flex: 1, justifyContent: "center" }}>
      <StatusBar backgroundColor="#4f9a94" />
      <FlatList
        data={incomes}
        contentContainerStyle={{ paddingBottom: 80 }}
        renderItem={({ item, index, renderSeparator }) => (
          <TouchableHighlight
            style={styles.card}
            key={item.key}
            onPress={() => Alert.alert(item.concepto)}
            underlayColor="#0093c4"
          >
            <View style={{ 
              flexDirection: "row" 
            }}>
              <View style={ styles.calendarCell }>
                <Text style = { styles.calendarText }>
                  {"  " + item.date}
                </Text>
              </View>
              <View style={{ flex: 0.6 }}>
                <Text style = { styles.categoryCell }>
                  {item.categoria}
                </Text>
                <Text style = { styles.descriptionCell }>
                  {item.concepto}
                </Text>
              </View>
              <View style={{ flex: 0.4 }}>
                <Text style = { styles.amountCell }>
                  ${item.monto.toFixed(2).toString()}
                </Text>
              </View>
            </View>
          </TouchableHighlight>
        )}
      />
      <Icon 
        name = "plus"
        type = "material-community"
        color = "#4f9a94"
        containerStyle = { styles.btnAddContainer }
        onPress = {
          () => { navigation.navigate("add-income"); } 
        }
        reverse
      />
    </View>
    
  );
}

const renderSeparator = () => {
  return (
    <View
      style={{
        height: 100,
        width: 3,
        backgroundColor: "#128c7e",
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: "bold",
    backgroundColor: "rgba(247,247,247,1.0)",
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    backgroundColor: "#FFFFFF",
  },
  card: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    fontFamily: "Roboto",
    borderBottomColor: "#cfcfcf",
    borderBottomWidth: 0.2,
    paddingTop: 10,
    paddingBottom: 10
  },
  vline: {
    height: 100,
    width: 3,
    backgroundColor: "#0093c4",
  },
  calendarCell: { 
    flex: 0.2,
    marginRight: 10,
    backgroundColor: "#4f9a94",
    borderColor: "#CCC",
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 5,
    paddingLeft: 5,
    marginLeft: 5,
    justifyContent: "center"
  },
  calendarText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#f5f5f5",
    marginLeft: 3
  },
  categoryCell: {
    fontSize: 12,
    fontWeight: "bold",
    fontStyle: "italic",
    marginTop: 10,
    borderBottomWidth: 0.3,
    borderBottomColor: "#616161",
    color: "#616161",
    textAlign: "right",
    paddingHorizontal: 20 
  },
  descriptionCell: {
    fontSize: 17,
    color: "#616161",
    alignSelf: "stretch",
    marginTop: 5
  },
  amountCell: {
    alignSelf: "flex-end",
    paddingHorizontal: 5,
    paddingVertical: 10,
    fontWeight: "bold",
    borderLeftWidth: 0.3,
    borderLeftColor: "#616161",
    marginVertical: 10
  },
  btnAddContainer: {
    flex: 1,
    position: "absolute",
    bottom: 10,
    right: 10,
    shadowColor: "#000000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2
  }
});
