const MODAL_ROUTES = {
  EVENTS: {
    CREATE: 'create-event/:type'
  },
  EXERCISES: {
    CREATE: 'create-exercise',
    EDIT: ':exerciseId',
    DETAILS: 'trainings/:id/:exerciseId',
    DETAILS_PARTICIPANTS: 'trainings/:id/:exerciseId/participants'
  },
  INJURIES: {
    CREATE: 'create-injury'
  },
  PARTICIPANTS: {
    DETAILS: 'participants/:type/:id'
  },
  TREATMENTS: {
    CREATE: 'create'
  },
  TRAINING_MODULES: {
    CREATE: 'create'
  }
}

export default MODAL_ROUTES
