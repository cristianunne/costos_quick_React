import React, { useContext, useEffect, useState  } from 'react'
import CalendarIcon from '../../icons/CalendarIcon'
import { GlobalDataContext, ItemsGlobalContext, QueryGlobalContext, SelectedQueryGlobalContext } from '../../context/GlobalContext';


const MonthItem = ({text_month, number_month, isPresent}) => {

    //necesito una variable global que almacene la presencia o no de los meses en los rodales seleccionados
    const { itemsSelected, setItemsSelected, reloadSelected, setReloadSelected,
        empresasSelected, setEmpresasSelected } = useContext(ItemsGlobalContext);


        const { queryRodales, setQueryRodales,
            queryYears, setQueryYears,
            queryMonth, setQueryMonth,
            queryMateriales, setQueryMateriales} = useContext(SelectedQueryGlobalContext);


    const { yearsSelected, setYearsSelected, yearsPresent, setYearsPresent,
            isYearPresent, setIsYearPresent, yearsOfRodalesFilter, setYearsOfRodalesFilter,
            monthsSelected, setMonthSelected, monthsPresent, setMonthsPresent,
            isMonthPresent, setIsMonthPresent } = useContext(QueryGlobalContext);

    const { pages, setPages,
        numberData, setNumberData,
        dataCostos, setDataCostos, 
        dataCostosDinamic, setDataCostosDinamic,
        isLoadingTcostos, setIsLoadingTcostos,
        currentPageAux, setCurrentPageAux } = useContext(GlobalDataContext);

    //Puedo usar un dataCostosDinamic para ir cambiando


    const [active, setActive] = useState();


    const onClickHandler = (button) => {
        console.log('years selected');
        console.log(yearsSelected);

        console.log('items selected');
        console.log(itemsSelected);

        //data dinamic mantiene los datos, data cambia el estado

        if(!active){

            //hago el query haciendo usando los meses como filtro


            let months_ = insertMonth(number_month);
            console.log('meses seleccionados');
            console.log(months_);
            setActive(!active);

          

        } else {
            //restauro el filtro
            setActive(!active);

            
        }

       


    }

    const insertMonth = (month) => {

        let months_ = [];

        let is_present = false;

        monthsSelected.forEach(element => {

            if(element == month){

                is_present = true;

            }

        });

        if(!is_present){

            months_ = [...monthsSelected, month];
            setMonthSelected(months_);

            return months_;
        }

        return monthsSelected;
    }

    const deleteMonth = (month) => {
        
    }



    useEffect(() => {

        //console.log(dataCostos);
    });


    return (

        <>
        {isPresent ? <button className="btn is_present btn-square btn-h-35 ps-1 pe-1 align-items-end btn-hover"
            onClick={onClickHandler}
            style={!active ? null : styles.active}>
                 <CalendarIcon></CalendarIcon>
            {text_month}
        </button> :
            <button className="btn btn-outline-light btn-square btn-h-35 ps-1 pe-1 align-items-end btn-hover" 

                disabled
              
                style={!active ? null : styles.active} 
             
                >
                     <CalendarIcon></CalendarIcon>
                {text_month}
            </button>
        }
    </>

    )
}

export default MonthItem


const styles = {
    active: {
        backgroundColor: '#206bc4',
        color: '#e3e3e3'
    }
};