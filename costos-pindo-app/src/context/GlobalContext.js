import React from 'react';


const GlobalContext = React.createContext({ rodalReload: false, setRodalReload: () => {}, reloadEmpresa: false, 
setReloadEmpresa : () => {}, numberActive : 0, setNumberActive : () => {}, 
empresasGlobal: null, setEmpresasGlobal: () => {}
});
export {GlobalContext};

const ItemsGlobalContext = React.createContext({itemsSelected: [], setItemsSelected: () => {}, reloadSelected : null, 
setReloadSelected: () => {}, empresasSelected: [], setEmpresasSelected: () => {}});
export {ItemsGlobalContext};

const QueryGlobalContext = React.createContext({yearsSelected: [], setYearsSelected: () => {}, 
yearsPresent: [], setYearsPresent: () =>{}, isYearPresent: false, setIsYearPresent: () => {}, 
yearsOfRodalesFilter: [], setYearsOfRodalesFilter: () => {}, 
monthsSelected: [], setMonthSelected: () => {}, monthsPresent: [], setMonthsPresent: () => {}, 
isMonthPresent: false, setIsMonthPresent: () => {}, 
materialesSelected: [], setMaterialesSelected: () => {}});
export {QueryGlobalContext};

const GlobalDataContext = React.createContext({ pages: 0, setPages: () => {}, numberData: 0, 
setNumberData : () => {}, dataCostos: [], setDataCostos: () => {}, 
isLoadingTcostos: false, setIsLoadingTcostos: () => {}, currentPageCostos: 1, setCurrentPageCostos: () => {},
materiales: [], setMateriales: () => {},  dataCostosDinamic: [], setDataCostosDinamic: () => {},
resumenCostos: [], setResumenCostos: () => {}, reloadResumenCostos: false, setReloadResumenCostos: () => {},
isLoadingResumenCostos: false, setIsLoadingResumenCostos: () => {},
materialesCurrent: [], setMaterialesCurrent: () => {}, materialesReload: false, setMaterialesReload: () => {},
statusMateriales: false, setStatusMateriales: () => {}
});
export {GlobalDataContext};

const SelectedQueryGlobalContext = React.createContext({ queryRodales: false, setQueryRodales: () => {}, 
    queryYears: false, setQueryYears: () => {}, queryMonth: false, setQueryMonth: () => {}, 
    queryMateriales: false, setQueryMateriales: () => {} });

export {SelectedQueryGlobalContext};