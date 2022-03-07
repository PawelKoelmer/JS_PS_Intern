import { classNames } from "../../enums";
import { getByClassName } from "../../helpers";

export function handleAddressToggleClick() {
    getByClassName(classNames.ADDRESS).style.display = getByClassName(classNames.CHECKBOX).checked ? 'block' : 'none';
}