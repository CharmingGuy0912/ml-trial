const reduceToEntities = arrayOfEntities =>
  arrayOfEntities.reduce((acc, entity) => ({...acc, [entity.id]: entity}), {})

export default reduceToEntities
