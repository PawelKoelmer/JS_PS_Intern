import { classNames } from "../enums";
import { handleLinkClick } from './linkHandler'

export function createUsersListPageLink() {
    const link = document.createElement('a');
    link.innerText = 'Show last 10 registered users';
    link.className = classNames.LINK_TO_TABLE;
    link.href = '';
    link.addEventListener('click',() => {
      handleLinkClick();
    })
    return link;
  }

  export function createMainPageLink(){
    const link = document.createElement('a');
    link.innerText = 'Back to main page';
    link.className = classNames.LINK_TO_MAIN_PAGE;
    link.href = '';
    link.addEventListener('click',() => {
      handleBackLinkClick();
    })
    return link;
  }
  