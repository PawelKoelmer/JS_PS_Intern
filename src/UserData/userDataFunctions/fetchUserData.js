import { API_URL } from "../../enums";
import { createUser } from "./createUser";


export async function fetchUser() {
    try {
      const person = await fetch(API_URL).then((res) => res.json());
      
      return createUser(person.results[0]);
    } catch (error) {
      console.log('Failed to receive API data');
    }
  }