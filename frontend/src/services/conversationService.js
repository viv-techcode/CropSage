import authService from "./authService";

export const getConversations = async () => {
  const res = await authService.get("/conversations");
  return res.data;
};

export const createConversation = async () => {
  const res = await authService.post("/conversations");
  return res.data;
};

export const getConversation = async (id) => {
  const res = await authService.get(`/conversations/${id}`);
  return res.data;
};

export const sendConversationMessage = async (id, message) => {
  const res = await authService.post(`/conversations/${id}/messages`, { message });
  return res.data;
};

export const deleteConversation = async (id) => {
  const res = await authService.delete(`/conversations/${id}`);
  return res.data;
};