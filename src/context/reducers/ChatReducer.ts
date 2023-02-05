import { ActionMap } from '../../types'
import { UserType } from '../ChatContext'

export enum Types {
  CHANGE_USER = 'CHANGE_USER',
  CLEAR = 'CLEAR',
}

type ChatType = {
  chatId: string
  user: UserType
}

type ChatPayload = {
  [Types.CHANGE_USER]: UserType & {
    currentUserId?: string
  }
  [Types.CLEAR]: null
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

    case Types.CLEAR:
      return {
        chatId: 'null',
        user: {},
      }

    default:
      return state
  }
}
