import { readUsers } from "./UserData/userDataFunctions/localStorageFunctions";

export function timestampToFormattedDateString(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    let month = date.getMonth()+1;
    let day = date.getDay()+1;
  
    if(month < 10) month = '0'+month;
    if(day < 10) day = '0' + day;
     
    return `${day}.${month}.${year}`;
  }
  
export function getByClassName(param) {
    return document.querySelector(`.${param}`);
  }
  
export function getAllElementsByClassName(param){
    return document.querySelectorAll(`.${param}`);
  }
  
export function getSpecificDataFromLocalStorage(){
  const users = readUsers();
  const latestUsersCount = 10;
  return users.length > latestUsersCount
    ? users.slice(users.length - latestUsersCount)
    : users;
}