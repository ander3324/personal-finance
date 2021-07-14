import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StatusBar, StyleSheet } from "react-native";
import { findAll } from "../../Services/FirebaseService";
import { Button, Card } from "react-native-elements";
import { useFocusEffect } from "@react-navigation/core";

import AppButton from "../../Components/AppButton";
import { useNavigation } from "@react-navigation/native";

export default function Dashboard() {
  const navigation = useNavigation();
  const [incomes, setIncomes] = useState({});
  const [expenses, setExpenses] = useState({});

  useEffect(() => {
    (async () => {
      setIncomes(await findAll("Operations", "income"));
      setExpenses(await findAll("Operations", "expense"));
    })();
  }, []);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        setIncomes(await findAll("Operations", "income"));
        setExpenses(await findAll("Operations", "expense"));
        getSaldo();        
      })();
    }, [])
  );

  const getSaldo = () => {
      return (getTotal(incomes) - getTotal(expenses));
  }

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
      <Card style = { styles.cardStyle }>
        <Text style={(styles.balanceCardText)}>
          $ {getSaldo().toFixed(2)}{" "}
        </Text>
        <Card.Divider />
        <View style = { styles.fixToText }>
          <AppButton 
            value = { `+ ${ getTotal(incomes) }` } 
            bgColor="#388e3c" 
            txtColor = "#FFFFFF" 
            action = { () =>  { navigation.navigate("add-income") } } />
          <AppButton 
            value = { `- ${ getTotal(expenses) }` } 
            bgColor="#c62828" 
            txtColor = "#FFFFFF" 
            action = { () => {navigation.navigate("add-expense")} } />
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 2,
   marginHorizontal: 2,
   justifyContent: "flex-start" 
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
    color: "#c62828",
  },
  ingresos: {
    textAlign: "center",
    fontSize: 20,
    margin: 10,
    color: "#388e3c",
  },
  cardStyle: {
    borderRadius: 35
  },
  cardText: {
    fontSize: 16,
    fontFamily: "Roboto",
    textAlign: "center",
  },
  balanceCardText: {
    fontSize: 34,
    color: "#212121",
    marginLeft: 5,
    fontStyle: "italic"    
  },
  fixToText: {
   flexDirection: "row",
   justifyContent: "space-between" 
  },
  btnIncomes: {
    backgroundColor: "#388e3c"
  }
});
