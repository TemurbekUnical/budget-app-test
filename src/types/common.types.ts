type IDType = `${string}-${string}-${string}-${string}-${string}`;

export interface IExpense {
  id: IDType;
  name: string;
  createdAt: number;
  amount: number;
  budgetId: string;
}

export interface IBudget {
  id: IDType;
  name: string;
  createdAt: number;
  amount: number;
  color: string;
  description: string;
}
