import React, { useContext, useEffect, useState } from 'react'
import ItemTabsMaterialesLi from './ItemTabsMaterialesLi';
import { GlobalDataContext } from '../../context/GlobalContext';

const ItemsBoxMaterialesContainer = () => {


    const { pages, setPages,
        numberData, setNumberData,
        dataCostos, setDataCostos, isLoadingTcostos, setIsLoadingTcostos,
        currentPageAux, setCurrentPageAux,  materiales, setMateriales } = useContext(GlobalDataContext);

    const [listItems, setListItems] = useState();
    const [reloadMaterial, setReloadMaterial] = useState(false);
    

    const createItems = (materiales) => {

        let items_ = [];
        Object.entries(materiales).forEach(([key, value]) => {

            //console.log(value);//
          //tengo que crear los items aca
          let item = <ItemTabsMaterialesLi material={value.maktx} 
            key={key}></ItemTabsMaterialesLi>
          items_.push(item);
    
        });
        setListItems(items_);
 
    }


    useEffect(() => {

        if(materiales != null){
            createItems(materiales);
           
        }

        //console.log('adfsgasdgsadgsdagasg');
     
      

    }, [materiales]);



    return (
        <>
        {listItems}
     
      </>
    )
}

export default ItemsBoxMaterialesContainer