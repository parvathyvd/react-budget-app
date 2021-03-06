import React from "react";
import BudgetCard from "./BudgetCard";
import { useBudgetContext } from "../contexts/BudgetContext";

const TotalBudgetCard = () => {
  const { budgets, expenses } = useBudgetContext();
  const amount = expenses.reduce((total, expense) => total + expense.amount, 0);
  const max = budgets.reduce((total, budget) => total + budget.max, 0);
  if (max === 0) return null;
  return <BudgetCard name="Total" amount={amount} max={max} gray hidebuttons />;
};

export default TotalBudgetCard;
