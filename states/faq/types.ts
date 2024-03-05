export type FaqStore = IFaqStoreStates & IFaqStoreActions;

export interface IFaqStoreStates {
  // TODO: Add types
  faqs: any[];
}

export interface IFaqStoreActions {
  getFaqs: () => Promise<void>;
}
