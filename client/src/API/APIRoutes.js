const host = import.meta.env.VITE_BACKEND_URL

export const setCityEndpoint = `${host}/user/city`
export const getCitiesEndpoint = `${host}/destination/get`
export const signupUserEndpoint = `${host}/user/signup`
export const loginUserEndpoint = `${host}/user/login`
export const getMessagesEndpoint = `${host}/message/get`
export const addMessageEndpoint = `${host}/message/add`
export const deleteChatsEndpoint = `${host}/message/delete`
export const geminiApi = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key"
export const createOrderEndpoint = `${host}/payment/create/orderId`
export const verifyPaymentEndpoint = `${host}/payment/api/payment/verify`
export const rapidApi = "https://booking-com18.p.rapidapi.com/stays/search?"