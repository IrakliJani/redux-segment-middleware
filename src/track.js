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
      if (params.category && params.name)
        return window.analytics.page(params.category, params.name, payload)
      else if (params.name)
        return window.analytics.page(params.name, payload)
      else
        return window.analytics.page(payload)

    case eventTypes.ALIAS:
      return window.analytics.alias(params.id, params.previousId)

    case eventTypes.GROUP:
      return window.analytics.group(params.id, payload)

    default:
      throw new Error('Event type is not correct')
  }
}
