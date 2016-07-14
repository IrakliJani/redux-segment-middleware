export * as eventTypes from './eventTypes'
import track from './track'

export default function segment (options) {
  if (!window.analytics) {
    throw new Error('Segment.io analytics.js library is not loaded')
  }

  return store => next => action => {
    if (!action.meta || !action.meta.analytics) {
      return next(action)
    }

    const { type } = action.meta.analytics

    if (!type) {
      throw new Error('Event type is not set...')
    }

    track(action, options)

    return next(action)
  }
}
