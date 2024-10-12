const host = import.meta.env.VITE_BACKEND_URL

export const setCityEndpoint = `${host}/user/city`
export const getMessagesEndpoint = `${host}/message/get`
export const addMessageEndpoint = `${host}/message/add`
export const deleteChatsEndpoint = `${host}/message/delete`
export const geminiApi = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key"