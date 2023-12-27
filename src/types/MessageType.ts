export type MessageType = {
  role: "assistant" | "user";
  content: string;
  audio?: string;
  video?: string;
};
