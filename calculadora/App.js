import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function App() {
  const [num, setNum] = useState("0");
  const [oldNum, setOldNum] = useState(null);
  const [operator, setOperator] = useState(null);

  function inputNum(value) {
    if (num.includes(".") && value === ".") return;
    if (num.includes(",") && value === ",") return;
    setNum(num === "0" && value !== "." && value !== "," ? value : num + value);
  }

  function clear() {
    setNum("0");
    setOldNum(null);
    setOperator(null);
  }

  function changeSign() {
    setNum(num.startsWith("-") ? num.substring(1) : "-" + num);
  }

  function percentage() {
    setNum(String(parseFloat(num.replace(",", ".")) / 100).replace(".", ","));
  }

  function handleOperator(value) {
    setOperator(value);
    setOldNum(num.replace(",", "."));
    setNum("0");
  }

  function calculate() {
    if (oldNum !== null && operator !== null) {
      const num1 = parseFloat(oldNum);
      const num2 = parseFloat(num.replace(",", "."));
      let result;

      switch (operator) {
        case "+":
          result = num1 + num2;
          break;
        case "-":
          result = num1 - num2;
          break;
        case "*":
          result = num1 * num2;
          break;
        case "/":
          if (num2 === 0) {
            alert("Erro: divisão por zero!");
            result = "0";
          } else {
            result = num1 / num2;
          }
          break;
        default:
          return;
      }

      setNum(String(result).replace(".", ","));
      setOldNum(null);
      setOperator(null);
    }
  }

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.result}>{num}</Text>
        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={clear}>
            <Text style={styles.text}>AC</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={changeSign}>
            <Text style={styles.text}>+/-</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={percentage}>
            <Text style={styles.text}>%</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.operator]}
            onPress={() => handleOperator("/")}
          >
            <Text style={styles.text}>÷</Text>
          </TouchableOpacity>
        </View>
        {/* Números e operadores */}
        {[
          [7, 8, 9, "*"],
          [4, 5, 6, "-"],
          [1, 2, 3, "+"],
        ].map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.button,
                  typeof item === "string" && styles.operator,
                ]}
                onPress={() =>
                  typeof item === "number"
                    ? inputNum(String(item))
                    : handleOperator(item)
                }
              >
                <Text style={styles.text}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => inputNum("0")}
          >
            <Text style={styles.text}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => inputNum(",")}
          >
            <Text style={styles.text}>,</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => inputNum(".")}
          >
            <Text style={styles.text}>.</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.operator]}
            onPress={calculate}
          >
            <Text style={styles.text}>=</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    screen: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "white",
    },
    container: {
      backgroundColor: "black",
      width: 370,
      height: 550,
      borderRadius: 20,
      padding: 10,
      justifyContent: "flex-end",
    },
    result: {
      color: "white",
      fontSize: 48,
      textAlign: "right",
      marginBottom: 20,
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-around",
      marginBottom: 10,
    },
    button: {
      backgroundColor: "#505050",
      width: 70,
      height: 70,
      borderRadius: 35,
      justifyContent: "center",
      alignItems: "center",
    },
    operator: {
      backgroundColor: "#FF9500",
    },
    text: {
      color: "white",
      fontSize: 28,
    },
});
  