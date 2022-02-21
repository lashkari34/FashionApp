import * as types from '../actions/types'

const initialState = {
  userDetails: ' ',
  testing: '',
  imageState: '',
  userToken: '',
  fcmToken: ''
}

export const reducer = (state = initialState, action) => {
  console.log(JSON.stringify(action))

  switch (action.type) {
    case types.SAVE_USER:
        return {
          ...state,
          userDetails: action.data 
        }

    case types.SAVE_USER_TOKE:
        return {
          ...state,
          userToken: action.data 
        }

    case types.SAVE_IMAGE:
      return {
        ...state,
        imageState: action.data
      }

    case types.SAVE_IMAGE:
      return {
        ...state,
        imageState: action.data
      }

    case types.SAVE_FCM_TOKEN:
      return {
        ...state,
        fcmToken: action.data
      }

    default:
      return state;
  }

}

