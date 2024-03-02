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

export const getYearsAPI = async () => {

    let headers = new Headers();


    headers.append('Accept', 'application/json'); // This one is enough for GET requests
    headers.append('Content-Type', 'application/json'); // This one sends body
    //headers.append('Access-Control-Allow-Origin', '*');
    //headers.append('X-CSRF-Token', csrf);

    //let data = { idcampaign: idcampaign, camion_origen: camion_origen }


    const rawResponse = await fetch(URLS.GET_YEARS, {
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


export const getDataByYearsAPI = async (filter) => {

    let headers = new Headers();
    console.log(filter);


    headers.append('Accept', 'application/json'); // This one is enough for GET requests
    headers.append('Content-Type', 'application/json'); // This one sends body
    headers.append('Access-Control-Allow-Origin', '*');

    let data = { 'years' : filter }
    console.log(data);


    const rawResponse = await fetch(URLS.GET_DATA_BY_YEARS, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
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


export const getYearsOfRodalesDataAPI = async (rodales) => {
    
    let headers = new Headers();
  
    headers.append('Accept', 'application/json'); // This one is enough for GET requests
    headers.append('Content-Type', 'application/json'); // This one sends body
    headers.append('Access-Control-Allow-Origin', '*');

    let data = { 'rodales' : rodales }


    const rawResponse = await fetch(URLS.GET_YEARS_BY_IDRODAL, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
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


export const getMonthsOfRodalesDataAPI = async (rodales) => {
    
    let headers = new Headers();
  
    headers.append('Accept', 'application/json'); // This one is enough for GET requests
    headers.append('Content-Type', 'application/json'); // This one sends body
    headers.append('Access-Control-Allow-Origin', '*');

    let data = { 'rodales' : rodales }


    const rawResponse = await fetch(URLS.GET_MONTHS_BY_IDRODAL, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
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


export const getMonthsByYearsAPI = async (years) => {
    
    let headers = new Headers();
  
    headers.append('Accept', 'application/json'); // This one is enough for GET requests
    headers.append('Content-Type', 'application/json'); // This one sends body
    headers.append('Access-Control-Allow-Origin', '*');

    let data = { 'years' : years }


    const rawResponse = await fetch(URLS.GET_MONTHS_BY_YEARS, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
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

export const getMetadataForQueryDataAPI = async (filter) => {

    let headers = new Headers();


    headers.append('Accept', 'application/json'); // This one is enough for GET requests
    headers.append('Content-Type', 'application/json'); // This one sends body
    headers.append('Access-Control-Allow-Origin', '*');

    let data = { filter }


    const rawResponse = await fetch(URLS.GET_METADATA_FOR_QUERY_DATA, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
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


export const getDataCostosCompletoAPI = async (filter) => {

    let headers = new Headers();


    headers.append('Accept', 'application/json'); // This one is enough for GET requests
    headers.append('Content-Type', 'application/json'); // This one sends body
    headers.append('Access-Control-Allow-Origin', '*');

    let data = { filter }


    const rawResponse = await fetch(URLS.GET_DATA_COSTOS_COMPLETO, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
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

export const getMaterialesAPI = async () => {

    let headers = new Headers();


    headers.append('Accept', 'application/json'); // This one is enough for GET requests
    headers.append('Content-Type', 'application/json'); // This one sends body
    //headers.append('Access-Control-Allow-Origin', '*');
    //headers.append('X-CSRF-Token', csrf);

    //let data = { idcampaign: idcampaign, camion_origen: camion_origen }


    const rawResponse = await fetch(URLS.GET_MATERIALES, {
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


export const getResumenCostosAPI = async (filter) => {

    let headers = new Headers();


    headers.append('Accept', 'application/json'); // This one is enough for GET requests
    headers.append('Content-Type', 'application/json'); // This one sends body
    headers.append('Access-Control-Allow-Origin', '*');

    let data = { filter }


    const rawResponse = await fetch(URLS.GET_RESUMEN_COSTOS, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
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

export const getMaterialesByQueryAPI = async (filter) => {

    let headers = new Headers();


    headers.append('Accept', 'application/json'); // This one is enough for GET requests
    headers.append('Content-Type', 'application/json'); // This one sends body
    headers.append('Access-Control-Allow-Origin', '*');

    let data = { filter }


    const rawResponse = await fetch(URLS.GET_MATERIALES_BY_QUERY, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
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

