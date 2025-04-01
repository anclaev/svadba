export const objToQuery = (obj: object) =>
  Object.keys(obj)
    .map(
      (key, index) =>
        `${index === 0 ? '?' : ''}${key}=${obj[key as keyof object]}`
    )
    .join('&')
