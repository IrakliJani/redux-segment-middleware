export * as eventTypes from './eventTypes'
import track from './track'

export default function segment (options) {
  if (!window.analytics) {
    throw new Error('Segment.io analytics.js library is not loaded')
  }

  return () => next => action => {
    if (!action.meta || !action.meta.analytics) {
      return next(action)
    }

    const { analytics } = action.meta
    const type = typeof analytics === 'object'
      ? analytics.type
      : analytics

    if (!type) {
      throw new Error('Event type is not set...')
    }

    track(type, action, options)

    return next(action)
  }
}
