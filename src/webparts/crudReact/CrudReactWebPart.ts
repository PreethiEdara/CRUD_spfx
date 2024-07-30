import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import "@pnp/sp/items";
import * as strings from 'CrudWebPartStrings';
import CrudReact from "./components/CrudReact";
import { ICrudReactProps } from './components/ICrudReactProps';
import { getSP } from '../..//pnpjsConfig';


export interface ICrudWebPartProps {
  description: string;
}


export default class CrudWebPart extends BaseClientSideWebPart<ICrudReactProps> {

  public render(): void {
    const element: React.ReactElement<ICrudReactProps> = React.createElement(
      CrudReact,
      {
        Position : this.properties.Position,
        Title: this.properties.Title,
        Id: this.properties.Id,
        spcontext:this.context
      }
    );

    ReactDom.render(element, this.domElement);
  }

  public async onInit(): Promise<void> {
    await super.onInit();
    getSP(this.context);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('Position', {
                  label: strings.PositionFieldLabel
                }),
                PropertyPaneTextField('Title', {
                  label: strings.TitleFieldLabel
                }),
                PropertyPaneTextField('Id', {
                  label: strings.IdFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
