// rrd imports
import { useLoaderData } from "react-router-dom";

// library import

// component imports
import Table from "../components/dashboard/Table";

// helpers
import { fetchData } from "../helpers";
import { IExpense } from "../types/common.types";

// loader
export async function expensesLoader() {
  const expenses = fetchData("expenses");
  return { expenses };
}

const ExpensesPage = () => {
  const { expenses } = useLoaderData() as { expenses: IExpense[] };

  return (
    <div className="grid-lg">
      <h1>All Expenses</h1>
      {expenses && expenses.length > 0 ? (
        <div className="grid-md">
          <h2>
            Recent Expenses <small>({expenses.length} total)</small>
          </h2>
          <Table expenses={expenses} />
        </div>
      ) : (
        <p>No Expenses to show</p>
      )}
    </div>
  );
};

export default ExpensesPage;
