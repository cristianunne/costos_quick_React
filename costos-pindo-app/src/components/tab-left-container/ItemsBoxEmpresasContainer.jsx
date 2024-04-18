import React, { useState,useEffect, useContext } from 'react'
import ItemTabsEmpresaLi from './ItemTabsEmpresaLi';
import { GlobalContext } from '../../context/GlobalContext';

const ItemsBoxEmpresasContainer = ({ empresas, status, rodales, rodalesDinamic , statusRodales, setRodales, setRodalesActually}) => {

    const [listItems, setListItems] = useState();
    const [listItemsDinamic, setListItemsDinamic] = useState();

    const [idEmpresa, setIdEmpresa] = useState();

    const {rodalReload, setRodalReload, reloadEmpresa, setReloadEmpresa} = useContext(GlobalContext);

    const createItemsTabsEmpresas = (empresas) => {

        let items_ = [];
        Object.entries(empresas).forEach(([key, value]) => {
    
    
          //tengo que crear los items aca
          let item = <ItemTabsEmpresaLi name_empresa={value.nombre} 
          idempresa={value.idempresa} key={key} rodales={rodales} 
          setRodales={setRodales}
          rodalesDinamic={rodalesDinamic}
          idEmpresa={idEmpresa}
          setIdEmpresa={setIdEmpresa}
          setRodalesActually={setRodalesActually}
          />
          items_.push(item);
    
        });
    
        setListItems(items_);
        setListItemsDinamic(items_);
        //setReloadEmpresa(reloadEmpresa ? false : true);
    
      }

    useEffect(()=> {
     
        if(empresas != null){
            createItemsTabsEmpresas(empresas);

        }
  
       
    }, [reloadEmpresa]);




    return (
        <>
            {listItems}
        </>
    )
}

export default ItemsBoxEmpresasContainer