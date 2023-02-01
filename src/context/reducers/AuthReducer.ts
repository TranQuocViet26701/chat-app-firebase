import { signOut, User } from 'firebase/auth'
import { auth } from '../../firebase'
import { ActionMap } from '../../types'
import { InitialStateType } from '../AuthContext'

export enum AuthTypes {
  CHANGE_CURRENT_USER = 'CHANGE_CURRENT_USER',
  LOG_IN = 'LOG_IN',
  LOG_OUT = 'LOG_OUT',
}

type AuthPayload = {
  [AuthTypes.CHANGE_CURRENT_USER]: User | null
  [AuthTypes.LOG_IN]: User | null
  [AuthTypes.LOG_OUT]: null
}

export type AuthActions = ActionMap<AuthPayload>[keyof ActionMap<AuthPayload>]

export const authReducer = (state: InitialStateType, action: AuthActions) => {
  switch (action.type) {
    case AuthTypes.CHANGE_CURRENT_USER:
      if (action.payload)
        return {
          ...state,
          currentUser: { ...action.payload },
        }
      return state
    case AuthTypes.LOG_IN:
      console.log('auth reducer login: ', action.payload)
      if (action.payload)
        return {
          ...state,
          isLogin: true,
          currentUser: { ...action.payload },
        }
      return state
    case AuthTypes.LOG_OUT:
      signOut(auth)
      localStorage.removeItem('accessToken')
      return {
        ...state,
        isLogin: false,
        currentUser: null,
      }
    default:
      return state
  }
}
