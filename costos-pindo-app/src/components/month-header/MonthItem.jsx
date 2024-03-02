import React, { useContext, useEffect, useState } from 'react'
import CalendarIcon from '../../icons/CalendarIcon'
import { GlobalDataContext, ItemsGlobalContext, QueryGlobalContext, SelectedQueryGlobalContext } from '../../context/GlobalContext';
import { getDataCostosFunction, getMetadataFunction, getResumenCostosFunction } from '../QuerysFunctions';

import {TYPE_ACTIONS_QUERY} from '../../utility/Utility';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const MonthItem = ({ text_month, number_month, isPresent, base_month }) => {

    //necesito una variable global que almacene la presencia o no de los meses en los rodales seleccionados
    const { itemsSelected, setItemsSelected, reloadSelected, setReloadSelected,
        empresasSelected, setEmpresasSelected } = useContext(ItemsGlobalContext);


    const { queryRodales, setQueryRodales,
        queryYears, setQueryYears,
        queryMonth, setQueryMonth,
        queryMateriales, setQueryMateriales } = useContext(SelectedQueryGlobalContext);


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

    //Puedo usar un dataCostosDinamic para ir cambiando


    const [active, setActive] = useState();


    const onClickHandler = async (button) => {


        //data dinamic mantiene los datos, data cambia el estado

        if (!active) {

            toast.success('El Mes ha sido incuido del Filtro!', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            }); 

            //limpio los materiales seleccionado
            setMaterialesSelected([]);
            setMaterialesReload(!materialesReload);

            //hago el query haciendo usando los meses como filtro
            let months_ = insertMonth(base_month);

            setActive(!active);

            //consulto si se hizo un yearsQuery, sino uso el Rodales Query

            if (queryYears) {

                updateCostos(TYPE_ACTIONS_QUERY.YearsQuery, [], yearsSelected, months_, [])


            } else if (queryRodales) {

                updateCostos(TYPE_ACTIONS_QUERY.RodalesQuery, 
                    itemsSelected, yearsSelected, months_, [])

            }

            //ELse que cierra el if de activo o no
        } else {
            //restauro el filtro
            setActive(!active);

            toast.error('El Mes ha sido quitado del Filtro!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });

            //limpio los materiales seleccionado

            //EStas acciones lo realizo indistintamente del tipo de query utizado
            setMaterialesSelected([]);
            setMaterialesReload(!materialesReload);

            let months_ = deleteMonth(base_month);

            //tengo que hacer la restauracion de los fitros
            //consulto por donde entro la consulta para restaurar los filtro
            if (queryRodales) {
                //desactivo e boton y actualizo los items de los meses

                updateCostos(TYPE_ACTIONS_QUERY.RodalesQuery, 
                    itemsSelected, yearsSelected, months_, []);


            } else if (queryYears) {

                //traigo los meses seleccionados, 

                //busco los a;os seleccionados y traigo los datos
                const arrFromObj = Object.keys(yearsSelected);
              

                if (arrFromObj.length > 0) {

                    //alert('acassgsdfgcsgmsidgcisdmhgcishr hscdrighmsdig');
                    updateCostos(TYPE_ACTIONS_QUERY.YearsQuery, [], yearsSelected, months_, [])

                }

            }

        }

    }

    const updateCostos = async (type_update, rodalesSel, yearsSe, monthsSel, materialeSel) => {

        //el type puede ser rodales (1) o query (2) o una enumeracion

        if (type_update == TYPE_ACTIONS_QUERY.YearsQuery) {

            //busco los a;os seleccionados y traigo los datos
            const arrFromObj = Object.keys(yearsSe);

            const month_obj = convertToObjectItems(monthsSel);

            if (arrFromObj.length > 0) {

                setIsLoadingTcostos(false);
                setIsLoadingResumenCostos(false);

                const data_ = await processQuery([], yearsSe, month_obj);

                //traigo los resumenes de costos
                const res_costo = await getResumenCostosFunction([], yearsSe, month_obj, []);
                setResumenCostos(res_costo);
                setReloadResumenCostos(!reloadResumenCostos);

                setIsLoadingResumenCostos(true);
                setIsLoadingTcostos(true);

            }


        } else if (type_update == TYPE_ACTIONS_QUERY.RodalesQuery) {

            const arrFromObj = Object.keys(rodalesSel);

            const month_obj = convertToObjectItems(monthsSel);

            if (arrFromObj.length > 0) {

                setIsLoadingResumenCostos(false);
                setIsLoadingTcostos(false);
                const data_ = await processQuery(rodalesSel, yearsSe, month_obj);

                //actualizo los costos
                //traigo los resumenes de costos
                const res_costo = await getResumenCostosFunction(rodalesSel, yearsSe, month_obj, []);
                setResumenCostos(res_costo);
                setReloadResumenCostos(!reloadResumenCostos);

                //actualizo el resumen
                setIsLoadingResumenCostos(true);

                setIsLoadingTcostos(true);

            }

        }


    }


    const insertMonth = (month) => {

        let months_ = [];

        let is_present = false;

        monthsSelected.forEach(element => {

            if (element == month) {

                is_present = true;

            }

        });

        if (!is_present) {

            months_ = [...monthsSelected, month];
            setMonthSelected(months_);

            return months_;
        }

        return monthsSelected;
    }


    const convertToObjectItems = (items) => {
        let obj = {};
        let index_ = null;

        items.forEach((el, index) => {

            obj[index] = el;
            //console.log(obj);ted, yearsPresent, setYearsPresent, 
            index_ = index;
        });
        index_++;
        //console.log(obj);
        //console.log(yearsObject);

        return obj;
    }

    const deleteMonth = (month) => {

        let months_ = [];

        monthsSelected.forEach(element => {

            if (element != month) {

                months_.push(element);

            }

        });

        setMonthSelected(months_);

        return months_;



    }


    const processQuery = async (rodalesSelected, yearsSelected, monthSelected) => {


        const metadata = await getMetadataFunction(rodalesSelected, yearsSelected, monthSelected, []);


        if (metadata != false) {
            //traigo los costos con la primer pagina
            const dataCostos_ = await getDataCostosFunction(rodalesSelected, yearsSelected, monthSelected, [], 1);



            if (dataCostos_ != false) {
                //console.log(dataCostos_);

                //seteo el numero de paginas y de 
                setNumberData(metadata.cantidad)
                setPages(metadata.pages);
                setDataCostos(dataCostos_);
                setDataCostosDinamic(dataCostos_);

                //deberia procesar los materiales

            }

        }

    }



    useEffect(() => {

        //console.log(dataCostos);

        if ((monthsSelected.length == 0 || monthsSelected == null) && active) {

            setActive(false);

        }


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