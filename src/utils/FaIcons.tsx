import { library } from "@fortawesome/fontawesome-svg-core";

/**
 * When adding an icon, first import that icon, and then make sure that icon is added to the lib (bottom of this file) as well
 */
import { faThumbsUp } from "@fortawesome/pro-regular-svg-icons";

import { faThumbsUp as faThumbsUpSolid } from "@fortawesome/pro-solid-svg-icons";

import { faInfoCircle } from "@fortawesome/pro-light-svg-icons";

export default function registerIcons() {
  library.add(faThumbsUp, faThumbsUpSolid, faInfoCircle);
}
declare module "@fortawesome/fontawesome-svg-core" {
  export interface Props {
    title: string;
  }
}
