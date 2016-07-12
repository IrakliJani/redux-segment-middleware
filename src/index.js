const middleware = next => action => {
  if (!action.meta || !action.meta.analytics) {
    return next(action)
  }

  console.log(action)

  return next(action)
}

export default function main () {
  if (!window.analytics) {
    throw new Error('Segment.io analytics.js library is not loaded')
  }

  return middleware
}
