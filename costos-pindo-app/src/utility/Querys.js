import { URLS } from "./URLS.JS";


export const getRodalesAPI = async () => {

    let headers = new Headers();


    headers.append('Accept', 'application/json'); // This one is enough for GET requests
    headers.append('Content-Type', 'application/json'); // This one sends body
    //headers.append('Access-Control-Allow-Origin', '*');
    //headers.append('X-CSRF-Token', csrf);

    //let data = { idcampaign: idcampaign, camion_origen: camion_origen }


    const rawResponse = await fetch(URLS.RODALES_GET, {
        method: 'GET',
        headers: headers
        //body: JSON.stringify(data)
    });

    try {
        const content = rawResponse.json();
        //console.log(content);

        //user = content;
        return content;
    } catch (err) {
        console.log(err);
        return false;
    }

}

export const getRodalesWithEmpresasAPI = async () => {

    let headers = new Headers();


    headers.append('Accept', 'application/json'); // This one is enough for GET requests
    headers.append('Content-Type', 'application/json'); // This one sends body
    //headers.append('Access-Control-Allow-Origin', '*');
    //headers.append('X-CSRF-Token', csrf);

    //let data = { idcampaign: idcampaign, camion_origen: camion_origen }


    const rawResponse = await fetch(URLS.GET_RODALES_WITH_EMPRESAS, {
        method: 'GET',
        headers: headers
        //body: JSON.stringify(data)
    });

    try {
        const content = rawResponse.json();
        //console.log(content);

        //user = content;
        return content;
    } catch (err) {
        console.log(err);
        return false;
    }

}


export const getEmpresasAPI = async () => {

    let headers = new Headers();


    headers.append('Accept', 'application/json'); // This one is enough for GET requests
    headers.append('Content-Type', 'application/json'); // This one sends body
    //headers.append('Access-Control-Allow-Origin', '*');
    //headers.append('X-CSRF-Token', csrf);

    //let data = { idcampaign: idcampaign, camion_origen: camion_origen }


    const rawResponse = await fetch(URLS.EMPRESAS_GET, {
        method: 'GET',
        headers: headers
        //body: JSON.stringify(data)
    });

    try {
        const content = rawResponse.json();
        //console.log(content);

        //user = content;
        return content;
    } catch (err) {
        console.log(err);
        return false;
    }

}

export const getRodalesByEmpresasAPI = async (idempresa) => {

    let headers = new Headers();


    headers.append('Accept', 'application/json'); // This one is enough for GET requests
    headers.append('Content-Type', 'application/json'); // This one sends body
    //headers.append('Access-Control-Allow-Origin', '*');
    //headers.append('X-CSRF-Token', csrf);

    let data = { idempresa: idempresa }

    console.log(URLS.GET_RODALES_BY_EMPRESAS + `${'?idempresa=' + idempresa}`);


    const rawResponse = await fetch(URLS.GET_RODALES_BY_EMPRESAS + `${'?idempresa=' + idempresa}`, {
        method: 'GET',
        headers: headers,
    });

    try {
        const content = rawResponse.json();
        //console.log(content);

        //user = content;
        return content;
    } catch (err) {
        console.log(err);
        return false;
    }

}

