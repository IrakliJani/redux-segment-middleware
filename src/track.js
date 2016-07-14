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
      return window.analytics[track](params.name || action.type, payload)

    case eventTypes.IDENTIFY:
      return window.analytics[track](params.id, payload)

    case eventTypes.PAGE:
      if (params.category && params.name)
        return window.analytics[type](params.category, params.name, payload)
      else if (params.name)
        return window.analytics[type](params.name, payload)
      else
        return window.analytics[type](payload)

    case eventTypes.ALIAS:
      return window.analytics[type](params.id, params.previousId)

    case eventTypes.GROUP:
      return window.analytics[type](params.id, payload)

    default:
      throw new Error('Event type is not correct')
  }
}
