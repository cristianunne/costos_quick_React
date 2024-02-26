import React, { useEffect, useState, useContext } from 'react'
import YearItem from './YearItem';
import { ItemsGlobalContext, QueryGlobalContext, SelectedQueryGlobalContext } from '../../context/GlobalContext';

const YearsListContainer = ({years_data}) => {

    const [items, setItems] = useState([]);

    const { yearsSelected, setYearsSelected, yearsPresent, setYearsPresent, 
        isYearPresent, setIsYearPresent } = useContext(QueryGlobalContext);

    const { itemsSelected, setItemsSelected, reloadSelected, setReloadSelected, 
        empresasSelected, setEmpresasSelected } = useContext(ItemsGlobalContext);





    const [reloadYears, setReloadYears] = useState(false);

        //si hay rodales seleccionados, tengo que dejar activo el buton para que se pueda
        //hacer consultas con sl year
    
    const [hasRodalesSelect, setHasRodalesSelect] = useState(false);

    const [isActive, setIsActive] = useState(false);



    const createItems = () => {

        let has_rodales = false;
        if(itemsSelected.length > 0){
            setHasRodalesSelect(true);
            has_rodales = true;
        }



        let items_ = [];

        years_data.forEach((year, index) => {


            //Recorro los year para verificar si esta presente o no
            let is_present = false;
            yearsPresent.forEach(isYear => {

                if(isYear == parseInt(year.years)){
                    is_present = true;
                }
            });
            
            items_.push(<YearItem year={year.years} key={index} isPresent={is_present} 
                has_rodales_select={has_rodales}></YearItem>);
        });

        setItems(items_);
    }


    useEffect(() => {

        //consulto por los rodales select
      
        createItems();
     
 
    }, [years_data, isYearPresent]);
    
    return (
        <div className="col-xl-6 d-flex gap-1 years-container justify-content-center pt-3 pb-2">

            {items}

        </div>
    )
}

export default YearsListContainer