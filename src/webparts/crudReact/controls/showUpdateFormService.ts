export const showUpdateFormService = (state: any, setState: any) => {
  console.log("showUpdateFormService called");
  const { items, selectedItemId } = state;
  const selectedItem = items.find((item: any) => item.Id === selectedItemId);
  if (selectedItem) {
    setState({
      newItemTitle: selectedItem.Title,
      newItemPosition: selectedItem.Position,
      showUpdateForm: true,
      showAddForm: false,
      readAllClicked: false
    });
    console.log("Updated state:", state);
  }
};
