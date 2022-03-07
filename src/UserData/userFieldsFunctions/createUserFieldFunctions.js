import { classNames } from "../../enums";
import { getByClassName, timestampToFormattedDateString } from "../../helpers";
import { handleAddressToggleClick } from "./userHandler";

export function createUserField({ className, data }) {
    const field = document.createElement('div');
    field.className = className;
    if(className === classNames.USER_NAME){
      field.innerText = createUserNameField(data);
    }
    else if (className === classNames.REGISTER_DATE) {
      field.innerText = timestampToFormattedDateString(data);
    } 
    else if (className === classNames.ADDRESS) {
      createUserAddressFields(data).forEach((addressField) => field.appendChild(addressField));
    }
    else if(className === classNames.IMAGE){
      field.appendChild(createUserImageField(data));
    }
    else {
      field.innerText = data;
    }
    return field;
  }

  function createUserNameField(data){

      let text = ''
      for (const key in data) {
        if (!data.hasOwnProperty(key)) {
          continue;
        }
        text += `${data[key]} `;
      } 
      return text;
  }

  function createUserAddressFields(address) {
    const fields = [];
    for (const key in address) {
      if (!address.hasOwnProperty(key)) {
        continue;
      }
      const field = document.createElement('div');
      field.className = key;
      field.innerText = address[key];
      fields.push(field);
    }
    return fields;
  }

  function createUserImageField(image){
    const img = document.createElement('img');
    img.src = image.large;
    return img;
  }

export function createToggleUserAddressVisibilityCheckbox() {
    const checkBox = document.createElement('input');
    checkBox.id = 'check';
    checkBox.type = 'checkbox';
    checkBox.className = classNames.CHECKBOX;
    checkBox.checked = true;
    checkBox.addEventListener('click', handleAddressToggleClick);
    return checkBox;
  }
  
export function createToggleUserAddressVisibilityCheckboxLabel() {
    const label = document.createElement('label');
    label.htmlFor = 'check';
    label.className = classNames.CHECKBOX_LABEL;
    label.innerText = 'Show/Hide Address';
    return label;
  }

