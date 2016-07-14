export function generatePayload ({ action, payload, normalize = (i) => i }) {
  if (payload) {
    return normalize(payload)
  } else {
    const obj = { ...action }
    delete obj.type
    delete obj.meta

    for (let key in obj) {
      obj[key] = normalize(obj[key])
    }

    return obj
  }
}
