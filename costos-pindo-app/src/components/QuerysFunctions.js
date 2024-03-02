


//tengo una consulta que trae los datos de los rodales 

import { getDataCostosCompletoAPI, getMaterialesByQueryAPI, getMetadataForQueryDataAPI, getResumenCostosAPI } from "../utility/Querys";

export const getMetadataFunction = async (itemsSelected, yearsSelected, monthsSelected, materialesSelected) => {


    let filter_data = {};

    filter_data['rodales'] = getRodalesFromItems(itemsSelected);
    //mando vacio years y months
    filter_data['years'] = yearsSelected; //$materiales
    filter_data['months'] = monthsSelected;
    filter_data['materiales'] = materialesSelected;

    const dataMetadataFromAPI = getMetadataForQueryDataAPI(filter_data);

    return dataMetadataFromAPI;    
}


export const getDataCostosFunction = async (itemsSelected, yearsSelected, monthsSelected, materialesSelected, page) => {


    let filter_data = {};

    filter_data['rodales'] = getRodalesFromItems(itemsSelected);
    //mando vacio years y months
    filter_data['years'] = yearsSelected;
    filter_data['months'] = monthsSelected;
    filter_data['materiales'] = materialesSelected;
    filter_data['page'] = page;


    const dataCostosFromAPI = getDataCostosCompletoAPI(filter_data);

    return dataCostosFromAPI;    
}



export const getResumenCostosFunction = async (itemsSelected, yearsSelected, monthsSelected, materialesSelected) => {


    let filter_data = {};

    filter_data['rodales'] = getRodalesFromItems(itemsSelected);
    //mando vacio years y months
    filter_data['years'] = yearsSelected;
    filter_data['months'] = monthsSelected;
    filter_data['materiales'] = materialesSelected;



    const dataCostosFromAPI = getResumenCostosAPI(filter_data);

    return dataCostosFromAPI;    
}


export const getMaterialesByQueryFunction = async (itemsSelected, yearsSelected, monthsSelected) => {


    let filter_data = {};

    filter_data['rodales'] = getRodalesFromItems(itemsSelected);
    //mando vacio years y months
    filter_data['years'] = yearsSelected;
    filter_data['months'] = monthsSelected;


    const matFromAPI = await getMaterialesByQueryAPI(filter_data);



    return matFromAPI;    
}




function getRodalesFromItems(itemsSelected) {


    let rodales = [];

    itemsSelected.forEach((rodal, index) => {

        rodales.push(rodal.objnr);
        
    });

    return rodales;

}
