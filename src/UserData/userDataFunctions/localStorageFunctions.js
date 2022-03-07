import { localStorageKeys } from "../../enums";

export function readUsers() {
    return readLocalStorageByKey(localStorageKeys.USERS_TABLE);
  }

export function saveUserToLocalStorage(user) {
    try {
      localStorage.setItem(
        localStorageKeys.USERS_TABLE,
        JSON.stringify([...readUsers(), user])
      );
    } catch (error) {
      console.log('Cannot add generated user to table');
    }
  }

function readLocalStorageByKey(key) {
    try {
      const users = localStorage.getItem(key);
      return users ? JSON.parse(users) : [];
    } catch (error) {
      console.log('Failed to read users', error);
    }
  }