
const url_api = 'http://localhost/sap_api/API/';

export const URLS = {

    RODALES_GET: url_api + 'getRodales',
    EMPRESAS_GET: url_api + 'getEmpresas',
    GET_RODALES_BY_EMPRESAS: url_api + 'getRodalesIdByEmpresa',
    GET_RODALES_WITH_EMPRESAS: url_api + 'getRodalesWithEmpresas',
    GET_YEARS: url_api + 'getYears',

    /* URL DE GET DATA */
    GET_DATA_BY_YEARS: url_api + 'getDataByYears',
    GET_METADATA_FOR_QUERY_DATA: url_api + 'getMetadataForQueryData',

    GET_YEARS_BY_IDRODAL: url_api + 'getYearsByIdRodal',
    GET_MONTHS_BY_IDRODAL: url_api + 'getMonthsByRodales',
    GET_DATA_COSTOS_COMPLETO: url_api + 'getDataCostosCompleto',

}