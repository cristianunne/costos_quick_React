import React from 'react';


const GlobalContext = React.createContext({ rodalReload: false, setRodalReload: () => {}, reloadEmpresa: false, 
setReloadEmpresa : () => {}, numberActive : 0, setNumberActive : () => {}, 
empresasGlobal: null, setEmpresasGlobal: () => {}
});
export {GlobalContext};

const ItemsGlobalContext = React.createContext({itemsSelected: [], setItemsSelected: () => {}, reloadSelected : null, 
setReloadSelected: () => {}, empresasSelected: [], setEmpresasSelected: () => {}});
export {ItemsGlobalContext};