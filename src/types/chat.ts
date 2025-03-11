export type History = {
  from?: string;
  to?: string;
  time?: string;
  text?: string;
};

export interface ChatHistory {
  id?: number;
  from?: string;
  to?: string;
  text: string;
  time?: string;
}
