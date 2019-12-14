// now we don't need this file because we moved action creation to the server side

// export const ALL_MESSAGES = "ALL_MESSAGES";

// export function allMessages(messages) {
//   return {
//     type: ALL_MESSAGES,
//     payload: messages
//   };
// }

// export const NEW_MESSAGE = "NEW_MESSAGE";

// export function newMessaage(message) {
//   return {
//     type: NEW_MESSAGE,
//     payload: message
//   };
// }

import superagent from "superagent";

const baseUrl = "//localhost:4000";

export const login = (name, password) => async dispatch => {
  const url = `${baseUrl}/login`;
  try {
    const response = await superagent.post(url).send({ name, password });

    console.log("response test:", response);
    const action = JSON.parse(response.text);
    dispatch(action);
  } catch (error) {
    console.log(error);
  }
};
export const signup = (name, password) => async dispatch => {
  const url = `${baseUrl}/user`;
  try {
    const response = await superagent.post(url).send({ name, password });

    console.log("response test:", response);
    const action = JSON.parse(response.text);
    dispatch(action);
  } catch (error) {
    console.log(error);
  }
};
