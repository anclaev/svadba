export const QUESTS = {
  PROLOG: 'prolog',
  YA_ZHDALA_TEBYA: 'allegrova',
  ARTEM: 'artem',
  ALINA: 'alina',
  PODAROK: 'podarok',
  MUSIC: 'music',
  POJELANIE: 'pojelanie',
  ZNANIE: 'znanie',
  SOVET: 'sovet',
} as const

export type QuestItem = {
  index: number
  title: string
  type: string
  description: string | null
  achievement: string
  side: boolean
}
