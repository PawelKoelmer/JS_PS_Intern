import { getAllElementsByClassName, getSpecificDataFromLocalStorage } from "../../helpers";
import { appendDataToTable } from "../renderTable";
import { classNames } from "../../enums";

export function handleSortTable(param, isClicked) {
    let dataTable = getSpecificDataFromLocalStorage();
    let flag = isClicked;
    getAllElementsByClassName(classNames.DATA_ROW).forEach(function(elem){elem.remove();});
    if (param === 'lastName') {
      if(isClicked){
        dataTable.sort(sortByLastNameAsc);
        flag = false;
      }else{
        dataTable.sort(sortByLastNameDesc);
        flag =  true;
      }
    }
    if (param === 'date') {
      if(isClicked){
        dataTable.sort(sortByDateAsc);
        flag = false;
      }else{
        dataTable.sort(sortByDateDesc);
        flag = true;
      }
    }
    appendDataToTable(dataTable);
    return flag;
  }

function sortByLastNameAsc(a, b) {
    return b.userName.lastName.localeCompare(a.userName.lastName);
  }
  function sortByLastNameDesc(a, b) {
    return a.userName.lastName.localeCompare(b.userName.lastName);
  }
  
  function sortByDateAsc(a, b) {
    return a.registerDate - b.registerDate;
  }
  function sortByDateDesc(a, b) {
    return b.registerDate - a.registerDate;
  }
  