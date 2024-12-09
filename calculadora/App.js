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
