import { useState } from "react";
import styles from "./App.module.css";
import Header from "./assets/components/Header/Header";

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState(0);
  const [income, setIncome] = useState(true);

  const addExpense = (expense) => {
    setExpenses([...expenses, expense]);
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

  return (
    <>
      <Header title="Controle Financeiro Pessoal" />
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
    </>
  );
};

export default App;
