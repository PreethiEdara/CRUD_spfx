import * as React from 'react';
import type { ICrudReactProps } from './ICrudReactProps';
import { SPFI } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { ICrudState } from './ICrudState';
import { getSP } from '../../../pnpjsConfig';
import { handleSubmit } from '../../controls/handleSubmit';
import { showUpdateFormService } from '../../controls/showUpdateFormService';
import { handleDeleteItem } from '../../controls/handleDeleteItem';
import { handleReadAll } from '../../controls/handleReadAll';


export default class CrudReact extends React.Component<ICrudReactProps, ICrudState> {
  private _sp: SPFI;
  
  constructor(props: ICrudReactProps) {
    super(props);
    this.state = {
      items: [],
      newItemTitle: '',
      newItemPosition: '',
      showAddForm: false,
      SuccessMessage: '',
      readAllClicked: false,
      selectedItemId: null,
      showUpdateForm: false
      
    };
    this._sp = getSP(this.props.spcontext);
  }
  


  async componentDidMount() {
    this.loadItems();
  }

  

  public render(): React.ReactElement<ICrudReactProps> {
    const {newItemTitle, newItemPosition, showAddForm,SuccessMessage,readAllClicked,items,selectedItemId,showUpdateForm } = this.state;
    console.log("Read all clicked:", readAllClicked);

    return (
      <div>
        <h2>CRUD Component_new</h2>
        {SuccessMessage && <div style={{ color: 'green' }}>{SuccessMessage}</div>}  {/* Conditionally render success message */}
        <div>
          

          {(showAddForm || showUpdateForm) && !readAllClicked && (
            <form onSubmit={(e) => handleSubmit(e, this.state, this._sp, this.setState.bind(this), this.loadItems)}>
              <input
                type="text"
                name="newItemTitle"
                placeholder="title"
                value={newItemTitle}
                onChange={this.handleInputChange}
              />
              <br></br>
              <input
                type="text"
                name="newItemPosition"
                placeholder="position"
                value={newItemPosition}
                onChange={this.handleInputChange}
              />
              <br></br>
              <button type="submit">Submit</button>
              
            </form>
          )}

          <br></br>
          <br></br>
            
          {!showUpdateForm && (
            <button onClick={this.toggleAddForm}>{showAddForm ? 'Cancel' : 'Add New Item'}</button>
          )}
          {!readAllClicked && !showAddForm && !showUpdateForm && ( 
            <button onClick={() => handleReadAll(this._sp, this.setState.bind(this),this.loadItems)}>Read All</button>)}
        </div>
        {readAllClicked &&(
          <ul>
            {items.map((item, index) => (
              <li key={index}>
                <input
              type="radio"
              name="selectedItem"
              value={item.Id}
              onChange={() => this.setState({ selectedItemId: item.Id })} 
            />
            {item.Title} - {item.Position}</li>
            ))}
          </ul>
        )}
        <br></br>

      {selectedItemId && (
        <div>
          {!showAddForm && !showUpdateForm && (
          <button onClick={() => showUpdateFormService(this.state, this.setState.bind(this))}>Update</button>)}

          {!showAddForm && !showUpdateForm && (
          <button onClick={() => handleDeleteItem(this._sp, selectedItemId, this.setState.bind(this), this.loadItems)}>Delete</button>)}
        </div>
      )}

      </div>  
    );
  }

  loadItems = async () => {
    try {
      const items = await this._sp.web.lists.getByTitle('crud_upd').items();
      this.setState({ items });
    } catch (error) {
      console.error("Error fetching items: ", error);
    }
  };

  toggleAddForm = () => {
    this.setState((prevState) => ({
      showAddForm: !prevState.showAddForm,
      readAllClicked: false,
      selectedItemId: null,
      showUpdateForm: false
    }));
  };


  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [e.target.name]: e.target.value } as unknown as Pick<ICrudState, keyof ICrudState>);
  };
  
}

