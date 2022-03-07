import { fetchUser } from "../userDataFunctions/fetchUserData";
import { saveUserToLocalStorage } from "../userDataFunctions/localStorageFunctions";
import { renderUser } from "../userFieldsFunctions/renderUser";

export async function handleCreateUserClick() {
    try {
      const user = await fetchUser();
      saveUserToLocalStorage(user);
      renderUser(user);
    } catch (error) {
      console.log(error);
    }
  }