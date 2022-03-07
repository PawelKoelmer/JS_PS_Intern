import { classNames } from '../../enums.js'

export function createContainer() {
    const container = document.createElement('div');
    container.className = classNames.USER_CONTAINER;
    return container;
  }
  
export function createUserContainer() {
    const container = document.createElement('div');
    container.className = classNames.USER_DATA_CONTAINER;
    return container;
  }