import config from 'app/config';

const baseUrl = config.backend;

// function CheckStatus(response, dispatch) {
//     if (!response.ok) {
//         if (response.status === 403) {
//             Storage.Save('token', '')
//             return dispatch(push('/signin'))
//         }

//         return Promise.reject(new Error(response.statusText || 'Status not OK'))
//     }

//     return response
// }

function ParseResponse(response: any) {
    return response.text()
    .then((text: string) => {
        try {
            return JSON.parse(text);
        } catch (err) {
            throw new Error('Invalid response structure');
        }
    });
}

interface FetchOpts {
    [ name: string ]: any;
}

function Fetch(url: string, opts: FetchOpts) {
    return fetch(baseUrl + url, {
        ...opts,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    })
    .then((response: any) => {
        if (response.ok) return ParseResponse(response);

        return ParseResponse(response)
        .then((err: any) => {
            if (err && err.error) throw new Error(err.error);
            throw new Error('Network request failed');
        });
    });
}

function QueryParams(params: FetchOpts) {
    return Object.keys(params)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
        .join('&');
}

export function Get(url: string, opts: FetchOpts = {}) {
    return Fetch(url + '?' + QueryParams(opts), {
        method: 'get',
    });
}

export function Post(url: string, body?: FetchOpts) {
    return Fetch(url, {
        body: JSON.stringify(body),
        method: 'post',
    });
}

// export function BasicGet(dispatch, url, opts) {
//     return fetch(baseUrl + url + '?' + QueryParams(opts), {
//         method: 'get',
//         credentials: 'include',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//             'x-access-token': Storage.Load('token'),
//         },
//     })
//     .then((response) => (CheckStatus(response, dispatch)))
//     .then(response => response.blob())
//     .then(blob => {
//         var url = window.URL.createObjectURL(blob);
//         var a = document.createElement('a');
//         a.href = url;
//         a.download = "report.xlsx";
//         a.click();
//     });
// }

// export function Upload(url, formData) {
//     return fetch(baseUrl + url, {
//         method: 'POST',
//         body: formData,
//         headers: {
//             'x-access-token': Storage.Load('token'),
//         },
//     })
//     .then(CheckStatus)
//     .then(ParseJSON)
// }
