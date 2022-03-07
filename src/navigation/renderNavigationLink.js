import { createMainPageLink, createUsersListPageLink } from './createNavigationLink';

export function renderNavigation(){
    document.body.appendChild(createUsersListPageLink());  
}

export function renderBackNavigationLink(){
    document.body.appendChild(createMainPageLink());
}