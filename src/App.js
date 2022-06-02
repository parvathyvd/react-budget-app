import { useState } from "react";
import { Stack, Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import AddBudgetModal from "./components/AddBudgetModal";
import AddExpenseModal from "./components/AddExpenseModal";
import BudgetCard from "./components/BudgetCard";
import TotalBudgetCard from "./components/TotalBudgetCard";
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard";
import ViewExpenseModal from "./components/ViewExpenseModal";
import {
  UNCATEGORIZED_BUDGET_ID,
  useBudgetContext,
} from "./contexts/BudgetContext";

function App() {
  const { budgets, getBudgetExpeses } = useBudgetContext();
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();
  const [viewExpenseModalBudgetId, setViewExpenseModalBudgetId] = useState("");

  const onBudgetClickHandler = () => {
    setShowBudgetModal(true);
  };
  const onExpenseClickHandler = (budgetId) => {
    setShowExpenseModal(true);
    setAddExpenseModalBudgetId(budgetId);
  };

  const onViewExpenseClickHandler = (budgetId) => {
    setViewExpenseModalBudgetId(budgetId);
  };

  return (
    <>
      <Container className="my-4">
        <Stack direction="horizontal" gap="2" className="mb-4">
          <h1 className="me-auto">Budgets</h1>
          <Button variant="primary" onClick={onBudgetClickHandler}>
            Add Budget
          </Button>
          <Button variant="primary" onClick={onExpenseClickHandler}>
            Add Expense
          </Button>
        </Stack>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(400px,1fr))",
            gap: "1rem",
            alignItems: "start",
          }}
        >
          {budgets.map((budget) => {
            const amount = getBudgetExpeses(budget.id).reduce(
              (total, expense) => total + expense.amount,
              0
            );
            return (
              <BudgetCard
                key={budget.id}
                name={budget.name}
                max={budget.max}
                amount={amount}
                onExpenseClick={() => onExpenseClickHandler(budget.id)}
                onViewExpenseClick={() => onViewExpenseClickHandler(budget.id)}
              />
            );
          })}
          <UncategorizedBudgetCard
            onExpenseClick={() => onExpenseClickHandler()}
            onViewExpenseClick={() =>
              onViewExpenseClickHandler(UNCATEGORIZED_BUDGET_ID)
            }
          />
          <TotalBudgetCard />
        </div>
      </Container>
      <AddBudgetModal
        show={showBudgetModal}
        handleClose={() => setShowBudgetModal(false)}
      />
      <AddExpenseModal
        show={showExpenseModal}
        defaultBudgetId={addExpenseModalBudgetId}
        handleClose={() => setShowExpenseModal(false)}
      />
      <ViewExpenseModal
        budgetId={viewExpenseModalBudgetId}
        handleClose={() => setViewExpenseModalBudgetId("")}
      />
    </>
  );
}

export default App;
