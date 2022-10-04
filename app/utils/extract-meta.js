const extractMeta = (meta = {}, totalKey = 'rowCount') => {
  const {limit = 0, offset = 0, [totalKey]: total = 0} = meta

  return {
    hasNextPage: limit + offset < total,
    total
  }
}

export default extractMeta
