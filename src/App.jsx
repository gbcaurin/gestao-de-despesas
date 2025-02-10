import { useState } from "react";
import styles from "./App.module.css";

import { FaAngleUp } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { FaRegTrashAlt } from "react-icons/fa";

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState(0);
  const [income, setIncome] = useState(true);

  const addExpense = (expense) => {
    setExpenses([expense, ...expenses]);
    console.log("Nova transação adicionada: ", expense);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!desc || !amount) {
      alert("Por favor, preencha todos os campos!");
      return;
    }

    const newTransaction = {
      desc,
      amount,
      type: income ? "income" : "expense",
    };
    addExpense(newTransaction);
    setDesc("");
    setAmount(0);
    setIncome(true);
  };

  const calcIncome = () => {
    let totalIncome = 0;
    expenses.forEach((expense) => {
      if (expense.type === "income") {
        totalIncome += Number(expense.amount);
      }
    });
    return totalIncome.toFixed(2);
  };

  const calcExpense = () => {
    let totalExpense = 0;
    expenses.forEach((expense) => {
      if (expense.type === "expense") {
        totalExpense += Number(expense.amount);
      }
    });
    return totalExpense.toFixed(2);
  };

  const calcTotal = () => {
    const totalIncome = calcIncome();
    const totalExpense = calcExpense();
    return (Number(totalIncome) - Number(totalExpense)).toFixed(2);
  };

  const deleteExpense = (index) => {
    const newExpenses = [...expenses];
    newExpenses.splice(index, 1);
    setExpenses(newExpenses);

    console.log("Transação deletada: ", expenses[index]);
  };

  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.title}>Controle Financeiro</h1>
      </div>
      <div className={styles.sections}>
        <section className={styles.income}>
          <div className={styles.titleRow}>
            <h2>Entradas</h2>
            <FaAngleUp />
          </div>
          <div className={styles.incomeContainer}>
            <div className={styles.incomeItem}>
              <span>R$ {calcIncome()} </span>
            </div>
          </div>
        </section>
        <section className={styles.expense}>
          <div className={styles.titleRow}>
            <h2>Saídas</h2>
            <FaAngleDown />
          </div>
          <div className={styles.expenseContainer}>
            <div className={styles.expenseItem}>
              <span>R$ {calcExpense()}</span>
            </div>
          </div>
        </section>
        <section className={styles.total}>
          <div className={styles.titleRow}>
            <h2>Total</h2>
            <RiMoneyDollarCircleLine />
          </div>
          <div className={styles.totalContainer}>
            <span>R$ {calcTotal()}</span>
          </div>
        </section>
      </div>
      <div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formControl}>
            <input
              type="text"
              id="desc"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Descrição"
              className={styles.input}
            />
          </div>
          <div className={styles.formControl}>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Valor"
              className={styles.input}
            />
          </div>
          <div className={styles.formControlButtons}>
            <label htmlFor="income">Entrada</label>
            <input
              type="radio"
              id="income"
              name="type"
              value="income"
              checked={income}
              onChange={() => setIncome(true)}
              className={styles.inputBtn}
            />
          </div>
          <div className={styles.formControlButtons}>
            <label htmlFor="expense">Saída</label>
            <input
              type="radio"
              id="expense"
              name="type"
              value="expense"
              checked={!income}
              onChange={() => setIncome(false)}
              className={styles.inputBtn}
            />
          </div>
          <button type="submit" className={styles.btn}>
            Adicionar
          </button>
        </form>
      </div>
      <div className={styles.titleRender}></div>
      <div className={styles.renderContainer}>
        {expenses.map((expense, index) => (
          <div key={index} className={styles.renderItem}>
            <h3>{expense.desc}</h3>
            <h3 style={{ color: expense.type === "expense" ? "red" : "green" }}>
              {expense.type === "expense"
                ? `- R$ ${expense.amount}`
                : `R$ ${expense.amount}`}
            </h3>
            {expense.type === "expense" ? (
              <FaAngleDown className={styles.down} />
            ) : (
              <FaAngleUp className={styles.up} />
            )}
            <button
              className={styles.deleteBtn}
              onClick={() => deleteExpense(index)}
            >
              <FaRegTrashAlt />
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default App;
