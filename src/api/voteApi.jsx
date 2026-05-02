import api from "./axios";

const voteApi = {
    checkAccess: (code) => api.post(`/check-access-code`, { 
        access_code: code 
    }),

    voting: (code, no_undi) => api.post(`/vote`, { 
        access_code: code, 
        candidate_no: no_undi 
    }),
}

export default voteApi;