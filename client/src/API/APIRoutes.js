const host = import.meta.env.VITE_BACKEND_URL

export const setCityEndpoint = `${host}/user/city`
export const getCitiesEndpoint = `${host}/destination/get`
export const signupUserEndpoint = `${host}/user/signup`
export const loginUserEndpoint = `${host}/user/login`
export const getMessagesEndpoint = `${host}/message/get`
export const addMessageEndpoint = `${host}/message/add`
export const deleteChatsEndpoint = `${host}/message/delete`
export const geminiApi = import.meta.env.VITE_GEMINI_API
export const createOrderEndpoint = `${host}/payment/create/orderId`
export const verifyPaymentEndpoint = `${host}/payment/api/payment/verify`
export const getOrderEndpoint = `${host}/payment/api/order`
export const rapidApi = import.meta.env.VITE_RAPID_API
export const getFlightsEndpoint = `${host}/flights`;