import React from "react";
import { Card, ProgressBar, Stack, Button, Modal } from "react-bootstrap";
import { currencyFormatter } from "../utils";

const BudgetCard = ({
  name,
  amount,
  max,
  gray,
  onExpenseClick,
  onViewExpenseClick,
  hidebuttons,
}) => {
  const getProgerssBarVariant = (amount, max) => {
    const ratio = amount / max;
    if (ratio < 0.5) return "primary";
    if (ratio < 0.75) return "warning";
    return "danger";
  };

  const classNames = [];
  if (amount > max) {
    classNames.push("bg-danger", "bg-opacity-10");
  } else if (gray) {
    classNames.push("bg-light");
  }
  return (
    <Card className={classNames.join(" ")}>
      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3">
          <div className="me-2">{name}</div>
          <div className="d-flex align-items-baseline">
            {currencyFormatter.format(amount)}
            {max && (
              <span className="text-muted fs-6 ms-1">
                / {currencyFormatter.format(max)}
              </span>
            )}
          </div>
        </Card.Title>
        {max && (
          <ProgressBar
            className="rounded-pill"
            min={0}
            max={max}
            now={amount}
            variant={getProgerssBarVariant(amount, max)}
          />
        )}
        {!hidebuttons && (
          <Stack direction="horizontal" gap="2" className="mt-4">
            <Button
              className="ms-auto"
              variant="outline-secondary"
              onClick={onExpenseClick}
            >
              Add Expense
            </Button>
            <Button variant="outline-primary" onClick={onViewExpenseClick}>
              View Expenses
            </Button>
          </Stack>
        )}
      </Card.Body>
    </Card>
  );
};

export default BudgetCard;
