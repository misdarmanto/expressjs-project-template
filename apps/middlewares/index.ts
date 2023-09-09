import { useAuthorization } from './access'
import { ipBlackList } from './ip-black-list'
import { uploadMidleWare } from './upload-file'

export const middleware = { useAuthorization, ipBlackList, uploadMidleWare }
