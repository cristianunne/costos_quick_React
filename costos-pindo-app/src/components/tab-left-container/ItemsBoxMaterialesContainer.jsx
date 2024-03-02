import React, { useContext, useEffect, useState } from 'react'
import ItemTabsMaterialesLi from './ItemTabsMaterialesLi';
import { GlobalDataContext, QueryGlobalContext } from '../../context/GlobalContext';

const ItemsBoxMaterialesContainer = () => {



  const { yearsSelected, setYearsSelected, yearsPresent, setYearsPresent,
    isYearPresent, setIsYearPresent, yearsOfRodalesFilter, setYearsOfRodalesFilter,
    monthsSelected, setMonthSelected, monthsPresent, setMonthsPresent,
    isMonthPresent, setIsMonthPresent,
    materialesSelected, setMaterialesSelected } = useContext(QueryGlobalContext);


  const { pages, setPages,
    numberData, setNumberData,
    dataCostos, setDataCostos,
    dataCostosDinamic, setDataCostosDinamic,
    isLoadingTcostos, setIsLoadingTcostos,
    currentPageCostos, setCurrentPageCostos,
    materiales, setMateriales,
    resumenCostos, setResumenCostos,
    reloadResumenCostos, setReloadResumenCostos,
    isLoadingResumenCostos, setIsLoadingResumenCostos,
    materialesCurrent, setMaterialesCurrent, 
    materialesReload, setMaterialesReload, 
    statusMateriales, setStatusMateriales } = useContext(GlobalDataContext);



  const [listItems, setListItems] = useState();
  const [reloadMaterial, setReloadMaterial] = useState(false);


  const createItems = async (materiales) => {

    
    //debo revisar los materialesSelected para activarlos
    
    //si la cantidad es > 0, entonces hay valores presentes
    const arr_mat_current = Object.keys(materialesCurrent);
    let items_ = [];

    if (arr_mat_current.length > 0) {

      Object.entries(materiales).forEach(([key, value]) => {

        let is_present = false;
        Object.entries(materialesCurrent).forEach(([key_curent, value_current]) => {

          //ojo que value y value_current puede ser nullos

          if(value_current.matnr == value.matnr){
            is_present = true;
           
          }
        
        });



        if(is_present){
            let item = <ItemTabsMaterialesLi material={value.maktx} idmaterial={value.matnr}
            key={value.matnr} is_present={true} is_active={false}></ItemTabsMaterialesLi>
          items_.push(item);

        } 

      });


    } else {

   

      setStatusMateriales(false);
      restaurarItems(materiales, items_);
      setStatusMateriales(true);
    

    }


    setListItems(items_);


  }


  const restaurarItems = (materiales, items_) => {


    //reviso los materiales selected
    
   

      Object.entries(materiales).forEach(([key, value]) => {

        let is_active = false;

        materialesSelected.forEach(ele => {
          
            if(ele.toString() == value.matnr.toString()){
              is_active = true;
            }

        });


        let item = <ItemTabsMaterialesLi material={value.maktx} idmaterial={value.matnr}
          key={value.matnr} is_present={false} is_active={is_active}></ItemTabsMaterialesLi>
        items_.push(item);
  
      });



    

  }


  useEffect(() => {
    

    if (materiales != null) {
     
      createItems(materiales);

    }


  }, [materiales, materialesReload]);



  return (
    <>
      {listItems}

    </>
  )
}

export default ItemsBoxMaterialesContainer