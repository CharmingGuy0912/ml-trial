const EVENT_TYPES = {
  AWAY_GAME: 'away_game',
  HOME_GAME: 'home_game',
  OTHER: 'other',
  PROFILE_TRAINING: 'profile_training',
  TOURNAMENT: 'tournament',
  TRAINING: 'training',
  VIDEO_ANALYSIS: 'video_session'
}

const EVENT_COLORS = {
  [EVENT_TYPES.HOME_GAME]: 'red',
  [EVENT_TYPES.OTHER]: 'orange',
  [EVENT_TYPES.PROFILE_TRAINING]: 'gray',
  [EVENT_TYPES.AWAY_GAME]: 'blue',
  [EVENT_TYPES.TOURNAMENT]: 'green',
  [EVENT_TYPES.TRAINING]: 'gray',
  [EVENT_TYPES.VIDEO_ANALYSIS]: 'orange'
}

const AVAILABLE_EVENT_TYPES = Object.values(EVENT_TYPES)

export {AVAILABLE_EVENT_TYPES, EVENT_COLORS}
export default EVENT_TYPES
