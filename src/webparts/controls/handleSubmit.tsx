import { SPFI } from "@pnp/sp";
import { service } from "./service";

export const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>,
  state: any,
  sp: SPFI,
  setState: any,
  loadItems: any
) => {
  e.preventDefault();
  const { newItemTitle, newItemPosition, showUpdateForm, selectedItemId } = state;
  try {
    if (showUpdateForm && selectedItemId !== null) {
      await service.updateItem(sp, "crud_upd", selectedItemId, { Title: newItemTitle, Position: newItemPosition });
      setState({ SuccessMessage: 'Successfully updated' });
    } else {
      await service.addItem(sp, "crud_upd", { Title: newItemTitle, Position: newItemPosition });
      setState({ SuccessMessage: 'Successfully saved' });
    }
    setTimeout(() => {
      setState({ SuccessMessage: '' });
    }, 3000);
    await loadItems();
    setState({ newItemTitle: '', newItemPosition: '', showAddForm: false, showUpdateForm: false, selectedItemId: null });
  } catch (e) {
    console.error(e);
  }
};
