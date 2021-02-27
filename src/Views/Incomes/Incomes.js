import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StatusBar,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  Alert,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import { size } from "lodash";
import moment from "moment/min/moment-with-locales";

export default function Incomes() {
  moment.locale("es");
  const incomes = [
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
  ];

  return (
    <View>
      <StatusBar backgroundColor="#4f9a94" />
      <FlatList
        data={incomes}
        renderItem={({ item, index, renderSeparator }) => (
          <TouchableHighlight
            style={styles.card}
            key={item.key}
            onPress={() => Alert.alert(item.concepto)}
            underlayColor="#128c7e"
          >
            <View style={{ flexDirection: "row" }}>
              <View style={ styles.calendarCell }>
                <Text style = { styles.calendarText }>
                  {item.fecha}
                </Text>
              </View>
              <View style={{ flex: 0.7 }}>
                <Text style = { styles.categoryCell }>
                  {item.categoria}
                </Text>
                <Text style = { styles.descriptionCell }>
                  {item.concepto}
                </Text>
              </View>
              <View style={{ flex: 0.3 }}>
                <Text style = { styles.amountCell }>
                  ${item.monto.toFixed(2)}
                </Text>
              </View>
            </View>
          </TouchableHighlight>
        )}
        /* renderItem={
          ({item}) => 
            <Text style={styles.item}>
              {item.fecha} | {item.concepto} | {item.monto}
            </Text>
          
        } */
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
    paddingVertical: 0,
    flex: 1,
    marginHorizontal: 0,
    borderBottomColor: "#128c7e",
    borderBottomWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    fontFamily: "Roboto"
  },
  vline: {
    height: 100,
    width: 3,
    backgroundColor: "#128c7e",
  },
  calendarCell: { 
    flex: 0.2,
    marginRight: 10,
    borderStyle: "solid",
    borderColor: "#128c7e",
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 5,
    margin: 5
  },
  calendarText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#128c7e"
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
    fontWeight: "normal",
    borderLeftWidth: 0.3,
    borderLeftColor: "#616161",
    marginVertical: 10
  }
});
