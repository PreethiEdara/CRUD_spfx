import { ICrudReactProps } from "./ICrudReactProps";

export interface ICrudState {
    items: ICrudReactProps[];
    newItemTitle: string;
    newItemPosition: string;
    showAddForm: boolean;
    SuccessMessage:string;
    readAllClicked: boolean;
    selectedItemId: number | null;
    showUpdateForm: boolean
  }

 