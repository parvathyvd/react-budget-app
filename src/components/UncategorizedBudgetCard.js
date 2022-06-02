import React from "react";
import {
  UNCATEGORIZED_BUDGET_ID,
  useBudgetContext,
} from "../contexts/BudgetContext";
import BudgetCard from "./BudgetCard";

const UncategorizedBudgetCard = (props) => {
  const { getBudgetExpeses } = useBudgetContext();
  const amount = getBudgetExpeses(UNCATEGORIZED_BUDGET_ID).reduce(
    (total, expense) => total + expense.amount,
    0
  );
  if (amount === 0) return null;
  return <BudgetCard gray name="Uncategorized" amount={amount} {...props} />;
};

export default UncategorizedBudgetCard;
