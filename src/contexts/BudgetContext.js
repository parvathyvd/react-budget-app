import { createContext, useContext, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import useLocaStorage from "../hooks/useLocalStorage";

export const BudgetContext = createContext({});
export const UNCATEGORIZED_BUDGET_ID = "uncategorized";

export const BudgetContextProvider = ({ children }) => {
  const [budgets, setBudgets] = useLocaStorage("budgets", []);
  const [expenses, setExpenses] = useLocaStorage("expenses", []);

  const getBudgetExpeses = (budgetId) => {
    //view expenses
    return expenses.filter((expense) => expense.budgetId === budgetId);
  };
  const addBudget = ({ name, max }) => {
    //check if budgetname already exist
    const existingBudget = budgets.find((bud) => bud.name === name);

    setBudgets((prev) => {
      if (existingBudget) {
        return prev;
      }
      return [...prev, { id: uuidV4(), name, max }];
    });
  };

  const addExpense = ({ budgetId, amount, description }) => {
    setExpenses((prev) => {
      return [...prev, { id: uuidV4(), budgetId, amount, description }];
    });
  };
  const deleteBudget = ({ id }) => {
    setExpenses((prevExpenses) => {
      return prevExpenses.map((expense) => {
        if (expense.budgetId !== id) return expense;
        return { ...expense, budgetId: UNCATEGORIZED_BUDGET_ID };
      });
    });

    setBudgets((prev) => {
      return prev.filter((budget) => budget.id !== id);
    });
  };
  const deleteExpense = ({ id }) => {
    setExpenses((prev) => {
      return prev.filter((budget) => budget.id !== id);
    });
  };
  return (
    <BudgetContext.Provider
      value={{
        budgets,
        expenses,
        getBudgetExpeses,
        addExpense,
        addBudget,
        deleteBudget,
        deleteExpense,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};

export const useBudgetContext = () => {
  return useContext(BudgetContext);
};
