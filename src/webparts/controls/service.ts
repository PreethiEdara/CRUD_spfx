import { SPFI } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

export const service = {
  getItems: async (sp: SPFI, listName: string) => {
    return await sp.web.lists.getByTitle(listName).items();
  },
  addItem: async (sp: SPFI, listName: string, item: any) => {
    return await sp.web.lists.getByTitle(listName).items.add(item);
  },
  updateItem: async (sp: SPFI, listName: string, itemId: number, item: any) => {
    return await sp.web.lists.getByTitle(listName).items.getById(itemId).update(item);
  },
  deleteItem: async (sp: SPFI, listName: string, itemId: number) => {
    return await sp.web.lists.getByTitle(listName).items.getById(itemId).delete();
  }
};
