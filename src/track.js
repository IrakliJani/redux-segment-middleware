import * as eventTypes from './eventTypes'

export default function track (action, options) {
  const { analytics: params } = action.meta
  const payload = options.normalizer
    ? options.normalizer(params.payload)
    : params.payload

  switch (params.type) {
    case eventTypes.TRACK:
      return window.analytics.track(params.name || action.type, payload)

    case eventTypes.IDENTIFY:
      return window.analytics.track(params.id, payload)

    case eventTypes.PAGE:
      return console.warn('not implemented yet')

    case eventTypes.ALIAS:
      return console.warn('not implemented yet')

    case eventTypes.GROUP:
      return console.warn('not implemented yet')

    default:
      throw new Error('Event type is not correct')
  }
}
