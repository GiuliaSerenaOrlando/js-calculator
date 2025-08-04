import React, { useState } from "react"
import "./App.css"

function App() {
  const [input, setInput] = useState("0")
  const [formula, setFormula] = useState("")
  const [evaluated, setEvaluated] = useState(false)

  const handleNumber = (value) => {
    if (evaluated) {
      setInput(value)
      setFormula(value === "0" ? "" : value)
      setEvaluated(false)
    } else {
      if (input === "0" && value === "0") return
      const newInput = input === "0" ? value : input + value
      setInput(newInput)
      setFormula(formula + value)
    }
  }

  const handleOperator = (operator) => {
    if (evaluated) {
      setFormula(input + operator)
      setInput(operator)
      setEvaluated(false)
      return
    }

    const endsWithOperator = /[+\-*/]$/.test(formula)
    const endsWithTwoOperators = /[+\-*/]{2}$/.test(formula)

    if (endsWithTwoOperators) {
      if (operator !== "-") {
        setFormula(formula.slice(0, -2) + operator)
      }
    } else if (endsWithOperator) {
      if (operator === "-") {
        setFormula(formula + operator)
      } else {
        setFormula(formula.slice(0, -1) + operator)
      }
    } else {
      setFormula(formula + operator)
    }

    setInput(operator)
  }

  const handleDecimal = () => {
    if (evaluated) {
      setInput("0.")
      setFormula("0.")
      setEvaluated(false)
      return
    }

    if (!input.includes(".")) {
      setInput(input + ".")
      setFormula(formula + ".")
    }
  }

  const handleClear = () => {
    setInput("0")
    setFormula("")
    setEvaluated(false)
  }

  const handleEquals = () => {
    try {
      let result = eval(formula)
      result = Math.round(result * 100000) / 100000 // 5 decimali
      setInput(result.toString())
      setFormula(formula + "=" + result)
      setEvaluated(true)
    } catch (e) {
      setInput("Error")
      setFormula("")
    }
  }

  return (
    <div id="calculator">
      <div id="display">{input}</div>
      <div className="buttons">
        <button id="clear" onClick={handleClear}>
          AC
        </button>
        <button id="divide" onClick={() => handleOperator("/")}>
          /
        </button>
        <button id="multiply" onClick={() => handleOperator("*")}>
          *
        </button>
        <button id="seven" onClick={() => handleNumber("7")}>
          7
        </button>
        <button id="eight" onClick={() => handleNumber("8")}>
          8
        </button>
        <button id="nine" onClick={() => handleNumber("9")}>
          9
        </button>
        <button id="subtract" onClick={() => handleOperator("-")}>
          -
        </button>
        <button id="four" onClick={() => handleNumber("4")}>
          4
        </button>
        <button id="five" onClick={() => handleNumber("5")}>
          5
        </button>
        <button id="six" onClick={() => handleNumber("6")}>
          6
        </button>
        <button id="add" onClick={() => handleOperator("+")}>
          +
        </button>
        <button id="one" onClick={() => handleNumber("1")}>
          1
        </button>
        <button id="two" onClick={() => handleNumber("2")}>
          2
        </button>
        <button id="three" onClick={() => handleNumber("3")}>
          3
        </button>
        <button id="equals" onClick={handleEquals}>
          =
        </button>
        <button id="zero" onClick={() => handleNumber("0")}>
          0
        </button>
        <button id="decimal" onClick={handleDecimal}>
          .
        </button>
      </div>
    </div>
  )
}

export default App
