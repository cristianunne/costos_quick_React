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
isMonthPresent: false, setIsMonthPresent: () => {}});
export {QueryGlobalContext};

const GlobalDataContext = React.createContext({ pages: 0, setPages: () => {}, numberData: 0, 
setNumberData : () => {}, dataCostos: [], setDataCostos: () => {}, 
isLoadingTcostos: false, setIsLoadingTcostos: () => {}, currentPageCostos: 1, setCurrentPageCostos: () => {}
});
export {GlobalDataContext};