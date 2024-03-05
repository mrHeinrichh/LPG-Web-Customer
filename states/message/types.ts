export type MessageStore = IMessageStoreStates & IMessageStoreActions;

export interface IMessageStoreStates {
  // TODO: Add types
  messages: any[];
}

export interface IMessageStoreActions {
  getMessages: (user: string) => Promise<void>;
  // TODO: Add types
  addMessage: (request: any) => Promise<void>;
  addNewMessage: (data: any) => void;
}
