import axiosInstance from '../plugins/axios';

const endpoint = 'users';

export const UsersAPI = {
  async index(offset = '', limit = '') {
    const url: URLSearchParams = new URLSearchParams();

    if (offset) url.append('offset', offset);
    if (limit) url.append('limit', limit);

    return axiosInstance.get([endpoint, url.toString()].join('?'));
  },

  async show(id: number | null = null) {
    return axiosInstance.get([endpoint, id].join('/'));
  },

  async getAuthUser() {
    return axiosInstance.get('auth')
  }
};
