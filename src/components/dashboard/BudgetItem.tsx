// rrd imports
import { Form, Link } from "react-router-dom";

// library imports
import {
  BanknotesIcon,
  TrashIcon,
  MinusCircleIcon,
} from "@heroicons/react/24/outline";

// helper functions
import {
  calculateSpentByBudget,
  formatCurrency,
  formatPercentage,
} from "../../helpers";
import { IBudget } from "../../types/common.types";

const BudgetItem = ({
  budget,
  showDelete = false,
}: {
  budget: IBudget;
  showDelete?: boolean;
}) => {
  const { id, name, amount, color, description } = budget;
  const spent = calculateSpentByBudget(id);
  const isMinus = amount - spent < 0;
  return (
    <div
      className="budget"
      style={{
        ["--accent" as any]: color,
      }}
    >
      <div className="progress-text">
        <h3>{name}</h3>
        <div className="tooltip"></div>
        <p>{formatCurrency(amount)} Budgeted </p>
      </div>
      <progress max={amount} value={spent}>
        {formatPercentage(spent / amount)}
      </progress>
      <div className="progress-text">
        <small>{formatCurrency(spent)} spent</small>
        <small className="flex-sm align-items-center">
          {formatCurrency(amount - spent)} {isMinus ? "minus" : "remaining"}
          {isMinus ? <MinusCircleIcon color="#f00" width={30} /> : ""}
        </small>
      </div>
      {showDelete ? (
        <div className="flex-sm">
          <Form
            method="post"
            action="delete"
            onSubmit={(event) => {
              if (
                !confirm(
                  "Are you sure you want to permanently delete this budget?"
                )
              ) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit" className="btn">
              <span>Delete Budget</span>
              <TrashIcon width={20} />
            </button>
          </Form>
        </div>
      ) : (
        <div className="flex-sm">
          <Link to={`/budget/${id}`} className="btn">
            <span>View Details</span>
            <BanknotesIcon width={20} />
          </Link>
        </div>
      )}
    </div>
  );
};
export default BudgetItem;
