import { SPFI } from "@pnp/sp";
import { service } from "./service";

export const handleDeleteItem = async (
  sp: SPFI,
  selectedItemId: number,
  setState: any,
  loadItems: any
) => {
  if (selectedItemId !== null) {
    try {
      await service.deleteItem(sp, "crud_upd", selectedItemId);
      setState({ SuccessMessage: 'Successfully deleted', selectedItemId: null });
      setTimeout(() => {
        setState({ SuccessMessage: '' });
      }, 3000);
      await loadItems();
    } catch (error) {
      console.error("Error deleting item: ", error);
    }
    setState({
      showAddForm: false,
      readAllClicked: false
    });
  }
};
