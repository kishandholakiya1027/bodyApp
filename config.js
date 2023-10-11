import { IS_IOS } from "./src/core-utils/utils"

export const API_URL = IS_IOS ? "http://localhost:5203/" : "http://10.0.2.2:5203/"
// export const API_URL = "http://localhost:5203/api"
export const IMAGE_URL = IS_IOS ? "http://localhost:5203/" : "http://10.0.2.2:5203/"