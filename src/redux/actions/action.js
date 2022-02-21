import * as types from './types'

export const saveUserDetail = data => (
  {
    type: types.SAVE_USER,
    data: data
  }
)

export const saveUserToken = data => (
  {
    type: types.SAVE_USER_TOKE,
    data: data
  }
)

export const saveImage = data => (
  {
    type: types.SAVE_IMAGE,
    data: data
  }
)

export const saveFCMToken = data => (
  {
    type: types.SAVE_FCM_TOKEN,
    data: data
  }
)
