import { useState } from "react";
import styles from "./App.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addExpense, deleteExpense } from "./features/expensesSlice"; // Importar a ação de deletar
import { FaAngleUp, FaAngleDown, FaRegTrashAlt } from "react-icons/fa";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const App = () => {
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState(0);
  const [income, setIncome] = useState(true);

  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expenses.expenses);

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

    dispatch(addExpense(newTransaction));

    setDesc("");
    setAmount(0);
    setIncome(true);
  };

  const handleDelete = (index) => {
    dispatch(deleteExpense(index));
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

  const calcCategoryData = () => {
    const categories = {};

    expenses.forEach((expense) => {
      const category = expense.desc || "Outras";
      categories[category] =
        (categories[category] || 0) + Number(expense.amount);
    });

    return categories;
  };

  const generateBarChartData = () => {
    const categoryData = calcCategoryData();
    const labels = Object.keys(categoryData);

    const incomeData = labels.map((label) => {
      const value = categoryData[label];
      return expenses.some(
        (expense) => expense.desc === label && expense.type === "income"
      )
        ? Math.abs(value)
        : 0;
    });

    const expenseData = labels.map((label) => {
      const value = categoryData[label];
      return expenses.some(
        (expense) => expense.desc === label && expense.type === "expense"
      )
        ? -Math.abs(value)
        : 0;
    });

    return {
      labels: labels,
      datasets: [
        {
          label: "Entradas",
          data: incomeData,
          backgroundColor: "#28a745",
          borderColor: "#28a745",
          borderWidth: 1,
        },
        {
          label: "Saídas",
          data: expenseData,
          backgroundColor: "#dc3545",
          borderColor: "#dc3545)",
          borderWidth: 1,
        },
      ],
    };
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  return (
    <>
      <>
        <div className={styles.header}>
          <h1 className={styles.title}>Controle Financeiro</h1>
        </div>

        <div className={styles.sections}>
          <section className={styles.income}>
            <div className={styles.titleRow}>
              <h3>Entradas</h3>
              <FaAngleUp />
            </div>
            <div className={styles.incomeContainer}>
              <div className={styles.incomeItem}>
                <span>R$ {calcIncome()}</span>
              </div>
            </div>
          </section>
          <section className={styles.expense}>
            <div className={styles.titleRow}>
              <h3>Saídas</h3>
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
              <h3>Total</h3>
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
            <div className={styles.controlForm}>
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
              <h3
                style={{
                  color: expense.type === "expense" ? "red" : "green",
                }}
              >
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
                onClick={() => handleDelete(index)}
              >
                <FaRegTrashAlt />
              </button>
            </div>
          ))}
        </div>
        <div className={styles.chartContainer}>
          <div className={styles.chartLine}>
            <Bar data={generateBarChartData()} options={barChartOptions} />
          </div>
        </div>
      </>
    </>
  );
};

export default App;
