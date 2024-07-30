import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ICrudReactProps {
  Id: number;
  Title: string;
  Position: string;
  spcontext:WebPartContext;

}
