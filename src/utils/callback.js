export function bindParameterToCallbackMap(parameter, callbackMap) {
  return Object.entries(callbackMap).reduce((map, [key, callback]) => {
    map[key] = callback.bind(null, parameter);
    return map;
  }, {});
}
