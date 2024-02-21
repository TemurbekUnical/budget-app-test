// rrd imports
import { Link, useLoaderData } from "react-router-dom";

// library imports

// components
import AddBudgetForm from "../components/dashboard/AddBudgetForm";
import AddExpenseForm from "../components/dashboard/AddExpenseForm";
import BudgetItem from "../components/dashboard/BudgetItem";
import Table from "../components/dashboard/Table";
import Login from "../components/shared/Login";

//  helper functions
import { fetchData } from "../helpers";
import { IBudget, IExpense } from "../types/common.types";

// loader
export function dashboardLoader() {
  const userName = fetchData("userName");
  const budgets = fetchData("budgets");
  const expenses = fetchData("expenses");
  return { userName, budgets, expenses };
}

const Dashboard = () => {
  const { userName, budgets, expenses } = useLoaderData() as {
    budgets: IBudget[];
    expenses: IExpense[];
    userName: string;
  };

  const isLogged = !!userName;
  if (!isLogged) {
    return <Login />;
  }
  return (
    <div className="dashboard">
      <h1>
        Welcome back, <span className="accent">{userName}</span>
      </h1>
      <div className="grid-sm">
        {budgets && budgets.length > 0 ? (
          <div className="grid-lg">
            <div className="flex-lg">
              <AddBudgetForm />
              <AddExpenseForm budgets={budgets} />
            </div>
            <h2>Existing Budgets</h2>
            <div className="budgets">
              {budgets.map((budget) => (
                <BudgetItem key={budget.id} budget={budget} />
              ))}
            </div>
            {expenses && expenses.length > 0 && (
              <>
                <div className="grid-md">
                  <h2>Recent Expenses</h2>
                  <Table
                    expenses={expenses
                      .sort((a, b) => b.createdAt - a.createdAt)
                      .slice(0, 8)}
                  />
                  {expenses.length > 8 && (
                    <Link to="expenses" className="btn btn--dark">
                      View all expenses
                    </Link>
                  )}
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="grid-sm">
            <p>Personal budgeting is the secret to financial freedom.</p>
            <p>Create a budget to get started!</p>
            <AddBudgetForm />
          </div>
        )}
      </div>
    </div>
  );
};
export default Dashboard;
