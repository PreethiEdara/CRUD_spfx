import { SPFI } from "@pnp/sp";

export const handleReadAll = async (
  sp: SPFI,
  setState: any,
  loadItems: any
) => {
  await loadItems();
  setState({ readAllClicked: true, selectedItemId: null, showUpdateForm: false });
};
