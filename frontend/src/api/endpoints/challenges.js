import { apiClient } from '../client';

export const challengeEndpoints = {
  listLive: (params) => {
    const search = new URLSearchParams(params || {}).toString();
    return apiClient.get(`/challenges/live${search ? `?${search}` : ''}`);
  },
  list: (params) => {
    const search = new URLSearchParams(params || {}).toString();
    return apiClient.get(`/challenges${search ? `?${search}` : ''}`);
  },
  getById: (id) => apiClient.get(`/challenges/${id}`),
};
