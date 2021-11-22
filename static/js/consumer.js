const BuscaDadosApi = async (url) => {
    return fetch(url).then(resp => resp.json()).then(json => json).catch(err => err)
}