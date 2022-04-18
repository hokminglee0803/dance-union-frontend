import axios from 'axios';

const config = {
    method: 'get',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Request-Headers': '*',
    },
};
export function postMember(data) {
    return axios({
        url: `https://dance-union-backend.herokuapp.com/member`,
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers': '*',
        },
        data: data
    })
        .then(function (response) {
            return response.status === 200;
        })
        .catch(function (error) {
            console.log(error);
        });
}

