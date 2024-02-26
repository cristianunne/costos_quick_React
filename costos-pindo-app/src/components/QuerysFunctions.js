


//tengo una consulta que trae los datos de los rodales 

import { getDataCostosCompletoAPI, getMetadataForQueryDataAPI } from "../utility/Querys";

export const getMetadataFunction = async (itemsSelected, yearsSelected, monthsSelected) => {


    let filter_data = {};

    filter_data['rodales'] = getRodalesFromItems(itemsSelected);
    //mando vacio years y months
    filter_data['years'] = yearsSelected;
    filter_data['months'] = monthsSelected;

    const dataMetadataFromAPI = getMetadataForQueryDataAPI(filter_data);

    return dataMetadataFromAPI;    
}


export const getDataCostosFunction = async (itemsSelected, yearsSelected, monthsSelected, page) => {


    let filter_data = {};

    filter_data['rodales'] = getRodalesFromItems(itemsSelected);
    //mando vacio years y months
    filter_data['years'] = yearsSelected;
    filter_data['months'] = monthsSelected;
    filter_data['page'] = page;


    const dataCostosFromAPI = getDataCostosCompletoAPI(filter_data);

    return dataCostosFromAPI;    
}




function getRodalesFromItems(itemsSelected) {

    let rodales = [];

    itemsSelected.forEach((rodal, index) => {

        rodales.push(rodal.objnr);
        
    });

    return rodales;

}
