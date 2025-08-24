// Small utility to allow enqueueing snackbars from non-React modules.
let _enqueue = null;

export const setEnqueueSnackbar = (fn) => {
  _enqueue = fn;
};

export const enqueue = (message, options = {}) => {
  try {
    if (_enqueue) _enqueue(message, options);
    else console.warn("enqueueSnackbar not initialized yet:", message);
  } catch (e) {
    // avoid breaking callers
    // eslint-disable-next-line no-console
    console.error("Failed to enqueue snackbar", e);
  }
};

export default {
  setEnqueueSnackbar,
  enqueue,
};
