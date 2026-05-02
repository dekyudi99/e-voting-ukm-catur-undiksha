import api from './axios';

const candidatesApi = {
    getCandidates: () => api.get(`/candidates`),
}

export default candidatesApi;