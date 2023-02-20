import { ToastOptions } from "react-toastify";

export const toastOptionsError: ToastOptions = Object.freeze({
    position:        'top-right',
    autoClose:       7000,
    hideProgressBar: false,
    closeOnClick:    true,
    pauseOnHover:    true,
    draggable:       true,
    progress:        undefined,
});

export const toastOptions: ToastOptions = Object.freeze({
    position:        'top-right',
    autoClose:       2000,
    hideProgressBar: false,
    closeOnClick:    true,
    pauseOnHover:    false,
    draggable:       true,
    progress:        undefined,
});