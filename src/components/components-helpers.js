import { useCallback, useState } from 'react';

/**
 * React hook to force a component to update.
 *
 * @return Dispatch
 */
const useForceUpdate = () => {
  const [ , dispatch ] = useState<{}>(Object.create(null));

  const memoizedDispatch = useCallback(() => {
      dispatch(Object.create(null));
    },
    [ dispatch ],
  );

  return memoizedDispatch;
}

/**
 * Example usage:
 *   ifVal(true) => true
 *   ifVal(false) => null - ignored by React
 *   ifVal(true, 'my value') => 'my value'
 *   ifVal(false, 'the true text', 'the false text') => 'my false value',
 *   ifVal(isGuest, handleGuest, handleUser) => it depends on isGuest value
 *
 * @param cond Condition
 * @param trueValue True result
 * @param falseValue False or null result
 * @return {boolean}
 */
const ifVal = (cond, trueValue=true, falseValue=null) => {
    return cond ? trueValue : falseValue
}

// Events
function on(eventType, listener) {
  document.addEventListener(eventType, listener);
}

function off(eventType, listener) {
  document.removeEventListener(eventType, listener);
}

function once(eventType, listener) {
  on(eventType, handleEventOnce);

  function handleEventOnce(event) {
    listener(event);
    off(eventType, handleEventOnce);
  }
}

function trigger(eventType, data) {
  const event = new CustomEvent(eventType, { detail: data });
  document.dispatchEvent(event);
}

/**
 * Convert anything to an array
 * @param items Anything
 * @return {Array}
 */
function convertToArray(items) {
  if (!items) return [];
  if (Array.isArray(items)) return items;
  return [items];
}

export { useForceUpdate, ifVal, on, once, off, trigger, convertToArray};