import { AuthContext } from './AuthContext'
import { useContext } from 'react'
import { UserType } from './ChatContext'

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key
      }
    : {
        type: Key
        payload: M[Key]
      }
}

export enum Types {
  CHANGE_USER = 'CHANGE_USER',
}

type ChatType = {
  chatId: string
  user: UserType
}

type ChatPayload = {
  [Types.CHANGE_USER]: UserType & {
    currentUserId?: string
  }
}

export type ChatActions = ActionMap<ChatPayload>[keyof ActionMap<ChatPayload>]

export const chatReducer = (state: ChatType, action: ChatActions) => {
  switch (action.type) {
    case Types.CHANGE_USER:
      if (!action.payload.currentUserId || !action.payload.uid)
        return {
          ...state,
          user: { ...action.payload },
        }

      const { currentUserId, uid } = action.payload

      return {
        user: { ...action.payload },
        chatId: currentUserId > uid ? currentUserId + uid : uid + currentUserId,
      }

    default:
      return state
  }
}
