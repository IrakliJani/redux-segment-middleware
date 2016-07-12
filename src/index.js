export * as eventTypes from './eventTypes'

export default function main (options) {
  if (!window.analytics) {
    throw new Error('Segment.io analytics.js library is not loaded')
  }

  return middleware(options)
}

const middleware = options => store => next => action => {
  if (!action.meta || !action.meta.analytics) {
    return next(action)
  }

  const { name, type, payload } = action.meta.analytics

  if (!type) {
    throw new Error('Action type is not set...')
  }

  window.analytics[type](name || action.type, options.normalizer
    ? options.normalizer(payload)
    : payload)

  return next(action)
}
