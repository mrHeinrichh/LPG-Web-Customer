export type TransactionStore = ITransactionStoreStates &
  ITransactionStoreActions;

export interface ITransactionStoreStates {
  // TODO: Add types
  transactions: any[];
}

export interface ITransactionStoreActions {
  getTransactions: (query: string) => Promise<void>;
}
