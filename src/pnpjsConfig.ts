import { WebPartContext } from "@microsoft/sp-webpart-base";
import { spfi, SPFI, SPFx } from "@pnp/sp";
import { LogLevel, PnPLogging } from "@pnp/logging";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/batching";

var _sp: SPFI;

export const getSP = (context?: WebPartContext): SPFI => {
  if (!_sp && context != null) {
    _sp = spfi().using(SPFx({ pageContext: context.pageContext })).using(PnPLogging(LogLevel.Warning));
  }
  return _sp;
};
