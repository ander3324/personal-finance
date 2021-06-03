import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StatusBar, StyleSheet } from "react-native";
import { findAll } from "../../Services/FirebaseService";
import { Card } from "react-native-elements";
import { useFocusEffect } from "@react-navigation/core";

export default function Dashboard() {
  const [saldo, setSaldo] = useState(10.5);
  const [incomes, setIncomes] = useState({});
  const [expenses, setExpenses] = useState({});

  useEffect(() => {
    (async () => {
      setIncomes(await findAll("Operations", "income"));
      setExpenses(await findAll("Operations", "expense"));
      /* setSaldo(getTotal(incomes) - getTotal(expenses)); */
    })();
  }, []);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        setSaldo(getTotal(incomes) - getTotal(expenses));
      })();
    }, )
  );

  const getTotal = (data) => {
    let total = 0.0;

    (async () => {
      for await (let item of data) {
        console.log(item.monto);
        total += parseFloat(item.monto);
      }
    })();

    console.log("El total es: " + total);
    return Number(total).toFixed(2);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#4ba3c7" />
      <Card>
        <Card.Title>Resumen</Card.Title>
        <Card.Divider />
        <Text style={(styles.cardText, styles.saldo)}>Mi Saldo: ${saldo} </Text>
        <Text style={styles.cardText, styles.ingresos}>Mis Ingresos: ${getTotal(incomes)} </Text>
        <Text style={styles.cardText, styles.gastos}>Mis Gastos: ${getTotal(expenses)} </Text>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 5,
    margin: 5,
    padding: 5,
  },
  saldo: {
    textAlign: "center",
    fontSize: 24,
    color: "#6886C8",
    margin: 10,
  },
  gastos: {
    textAlign: "center",
    fontSize: 20,
    margin: 10,
    color: "#c62828"
  },
  ingresos: {
    textAlign: "center",
    fontSize: 20,
    margin: 10,
    color: "#388e3c"
  },
  cardText: {
    fontSize: 16,
    fontFamily: "Roboto",
    textAlign: "center",
  },
});
