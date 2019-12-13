export const ALL_MESSAGES = "ALL_MESSAGES";

export function allMessages(messages) {
  return {
    type: ALL_MESSAGES,
    payload: messages
  };
}

export const NEW_MESSAGE = "NEW_MESSAGE";

export function newMessaage(message) {
  return {
    type: NEW_MESSAGE,
    payload: message
  };
}