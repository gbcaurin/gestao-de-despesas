import { db } from "./firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

const expensesCollection = collection(db, "expenses");

export const addExpenseToFirestore = async (expense) => {
  await addDoc(expensesCollection, expense);
};

export const getExpensesFromFirestore = async () => {
  const snapshot = await getDocs(expensesCollection);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const deleteExpenseFromFirestore = async (id) => {
  const expenseDoc = doc(db, "expenses", id);
  await deleteDoc(expenseDoc);
};
