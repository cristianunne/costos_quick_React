import React, { useContext, useEffect, useState } from 'react'
import ItemTabsRodalLi from './ItemTabsRodalLi'



import { GlobalContext } from '../../context/GlobalContext';

const ItemsBoxRodalesContainer = ({rodales, status}) => {

    const [listItems, setListItems] = useState();
    const [listItemsDinamic, setListItemsDinamic] = useState();
    const {rodalReload, setRodalReload} = useContext(GlobalContext)

    const [rodalesAux, setRodalesAux] = useState();



    

    const [busqueda, setBusqueda] = useState();

    const createItemsTabsRodales = (rodales) => {

        let items_ = [];
        Object.entries(rodales).forEach(([key, value]) => {
    
    
          //tengo que crear los items aca
          let item = <ItemTabsRodalLi name_rodal={value.rodal} idrodal={value.objnr} 
          rodal={value} key={key}></ItemTabsRodalLi>
          items_.push(item);
    
        });
    
        setListItems(items_);
        setListItemsDinamic(items_);

    
      }

  
      useEffect(()=> {

        if(rodales != null){
            createItemsTabsRodales(rodales);
        }

       
      }, [rodalReload]);


    return (
        <>
          {listItems}
       
        </>
    )
}

export default ItemsBoxRodalesContainer