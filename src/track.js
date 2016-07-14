import * as eventTypes from './eventTypes'
import { generatePayload } from './helpers'

export default function track (type, action, options) {
  const { analytics: params } = action.meta
  const payload = generatePayload({
    action,
    payload: params.payload,
    normalize: options.normalize
  })

  switch (type) {
    case eventTypes.TRACK:
      return window.analytics.track(params.name || action.type, payload)

    case eventTypes.IDENTIFY:
      return window.analytics.identify(params.id, payload)

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
