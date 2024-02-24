import React, { useContext } from 'react'
import TrashIcon from '../../icons/TrashIcon'
import { ItemsGlobalContext, QueryGlobalContext } from '../../context/GlobalContext';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getMonthsOfRodalesDataAPI, getYearsOfRodalesDataAPI } from '../../utility/Querys';

const ItemAcordionSelected = ({ name_rodal, item }) => {

    const { itemsSelected, setItemsSelected, reloadSelected, setReloadSelected,
        empresasSelected, setEmpresasSelected } = useContext(ItemsGlobalContext);

    const { yearsSelected, setYearsSelected, yearsPresent, setYearsPresent,
            isYearPresent, setIsYearPresent, yearsOfRodalesFilter, setYearsOfRodalesFilter,
            monthsSelected, setMonthSelected, monthsPresent, setMonthsPresent,
            isMonthPresent, setIsMonthPresent } = useContext(QueryGlobalContext);




    const onClickHandler = () => {



        let items_ = [];

        //elimina el objeto

        itemsSelected.forEach(ele => {

            if (item.objnr != ele.objnr) {
                items_.push(ele);
            }

        });



        if (items_.length < itemsSelected.length) {

            toast.success('El Rodal ha sido aliminado!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });

            setItemsSelected(items_);

            //tengo que llamar al useeffect de los years items modificando los yearsselected
            //primero modifico itemselected

            //rearmar un array con los nuevos rodales que quedaron activos que son los items_

            let rodales_idxs = {}

            items_.forEach((ele, index) => {

                rodales_idxs[index] = ele.objnr;
            });


            //vuelvo a recargar YearsLiCOntainer
            //eliminando yearsPresent segun la nueva lista actual

            const years_data = getYearsByIdRodal(rodales_idxs);
            const months_data = getMonthByRodales(rodales_idxs);


            //verifico que las empresas seleccionadas tengan iconos o la elimino del TOC SELECTED
            //cambio empresas selectec
            verifiedEmpresasSelected(items_);

            //elimino los meses involucrados en el rodal





        } else {
            toast.error('El Rodal no se ha eliminado. Intente nuevamente!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }

    }

    

    const verifiedEmpresasSelected = (rodales) => {

        //recorro las empresas
       
        let emp_items = [];

        empresasSelected.forEach(emp => {

            console.log('dshgihaisemhgiacpiqhwergegerg');

            let emp_exist = false;

            //recorro los rodales items y compruebo laempresa
            rodales.forEach(rodal => {

                if(rodal.idempresa == emp){
                    emp_exist = true;

                }

            });

            if(emp_exist){
                emp_items.push(emp);
            }

        });

        setEmpresasSelected(emp_items);
        setReloadSelected(!reloadSelected);



    }


    const getYearsByIdRodal = async (rodales) => {

        const years_data = await getYearsOfRodalesDataAPI(rodales);


        if (years_data != false && years_data != null) {

            //recorro los years present globales y modificosi algo ha sucedido

            let years_ = [];
            let new_years = [];

            years_data.forEach(element => {


                years_.push(parseInt(element.year))


            });


            setYearsPresent(years_);
            //console.log(yearsPresent);
            setIsYearPresent(!isYearPresent);

        } else {
            setYearsPresent([]);
            setIsYearPresent(!isYearPresent);
        }




    }

    const getMonthByRodales = async (rodales) => {

        const months_data = await getMonthsOfRodalesDataAPI(rodales);

        console.log(months_data);

        if(months_data != null && months_data != false){


            let months_ = [];
         

            months_data.forEach(element => {

                months_.push(parseInt(element.month));
                
            });


            setMonthsPresent(months_);
            setIsMonthPresent(!isMonthPresent);


        } else {

            setMonthsPresent([]);
            setIsMonthPresent(!isMonthPresent);

        }
      
       

    }





    return (
        <div className="list-group list-group-flush d-flex bg-dark">
            <div className="list-group-item list-group-item-action d-flex item-list bg-dark text-white" aria-current="true">
                <div className="text-item-content p-1 d-flex flex-column 
            align-items-start justify-content-center">{name_rodal} </div>

                <div className="number-item-content p-1 icon-subitem" onClick={onClickHandler}>
                    <TrashIcon></TrashIcon>

                </div>
            </div>
        </div>
    )
}

export default ItemAcordionSelected