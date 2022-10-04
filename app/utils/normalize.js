import normalizer from 'jsonapi-normalizer'

const normalize = (json, {extractLinks, extractMeta} = {}) => {
  if (!json.data) {
    json.data = json
  }
  const normalized = normalizer(json)

  if (extractLinks && json.links) {
    normalized.links = json.links
  }

  if (extractMeta && json.meta) {
    normalized.meta = json.meta
  }

  return normalized
}

export default normalize
