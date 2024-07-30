declare interface ICrudWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  AppLocalEnvironmentSharePoint: string;
  AppLocalEnvironmentTeams: string;
  AppLocalEnvironmentOffice: string;
  AppLocalEnvironmentOutlook: string;
  AppSharePointEnvironment: string;
  AppTeamsTabEnvironment: string;
  AppOfficeEnvironment: string;
  AppOutlookEnvironment: string;
  UnknownEnvironment: string;
  PositionFieldLabel: string,
  TitleFieldLabel: string,
  IdFieldLabel: string
}



declare module 'CrudWebPartStrings' {
  const strings: ICrudWebPartStrings;
  export = strings;
}
