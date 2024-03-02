import React, { useState, useContext, useEffect } from 'react'
import { GlobalContext, GlobalDataContext, ItemsGlobalContext, QueryGlobalContext, SelectedQueryGlobalContext } from '../../context/GlobalContext';
import RodalesIcon from '../../icons/RodalesIcon';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getMetadataForQueryDataAPI, getMonthsOfRodalesDataAPI, getResumenCostosAPI, getYearsOfRodalesDataAPI } from '../../utility/Querys';
import { getDataCostosFunction, getMaterialesByQueryFunction, getMetadataFunction, getResumenCostosFunction } from '../QuerysFunctions';

const ItemTabsRodalLi = ({ name_rodal, idrodal, rodal }) => {

    const [active, setActive] = useState();



    //items selected corresponde con los rodales seleccionados en el sidebar de abajo a la izquierda

    const {rodalReload, setRodalReload} = useContext(GlobalContext);

    const { itemsSelected, setItemsSelected, reloadSelected, setReloadSelected, 
        empresasSelected, setEmpresasSelected } = useContext(ItemsGlobalContext);

    const { yearsSelected, setYearsSelected, yearsPresent, setYearsPresent,
        isYearPresent, setIsYearPresent, yearsOfRodalesFilter, setYearsOfRodalesFilter,
        monthsSelected, setMonthSelected, monthsPresent, setMonthsPresent,
        isMonthPresent, setIsMonthPresent } = useContext(QueryGlobalContext);

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

            //materiales current guarda los materiales de la consulta actual

    
    const { queryRodales, setQueryRodales,
        queryYears, setQueryYears,
        queryMonth, setQueryMonth,
        queryMateriales, setQueryMateriales} = useContext(SelectedQueryGlobalContext);


    const getYearsByIdRodal = async (rodales) => {

        const years_data = await getYearsOfRodalesDataAPI(rodales);


        if (years_data != false && years_data != null) {

            //recorro los years present globales y modificosi algo ha sucedido

            let years_ = [];
            let new_years = [];

            years_data.forEach(element => {


                //verifico que el elemento este o no presente en el global
                let is_present = false;

                if (yearsPresent.length == 0) {
                    years_.push(parseInt(element.year));

                } else {

                    yearsPresent.forEach(year_el => {

                        if (year_el == element.year) {
                            is_present = true;
                        }

                    });

                    if (!is_present) {
                        years_.push(parseInt(element.year));

                    }

                }


            });

            new_years = [...yearsPresent, ...years_];

            setYearsPresent(new_years);
            //console.log(yearsPresent);
            setIsYearPresent(!isYearPresent);

        } else {
            console.log('dsifhaoivgamirvoaegraergaerg');
        }

        setIsYearPresent(!isYearPresent);


    }

    const getMonthByRodales = async (rodales) => {


        const months_data = await getMonthsOfRodalesDataAPI(rodales);


        let cantidad = 0;
       

        if(months_data != null && months_data != false){


            let months_ = [];
            let new_months = [];

            


            months_data.forEach(element => {

                //verifico que el elemento este o no presente en el global
                let is_present = false;

                //si months_ es 0 significa que no tiene elementos entonces solo agrego
                if (monthsPresent.length == 0) {
                    months_.push(parseInt(element.month));

                } else {

                    if(queryYears){

                        months_.push(parseInt(element.month));

                    } else {
                        monthsPresent.forEach(month_el => {

                            let mes = parseInt(month_el);
    
                            if (mes == element.month) {
                                is_present = true;
                            }
    
                        });
    
    
                        if (!is_present) {
                            months_.push(parseInt(element.month));
    
                        }
                    }

                    
                }

            });

         
            if(queryYears){
              
                setMonthsPresent(months_);
                setQueryYears(false);
            } else {

                
                new_months = [...monthsPresent, ...months_];
                setMonthsPresent(new_months);
                
            }
            
           
            setIsMonthPresent(!isMonthPresent);
            
        }
      
       

    }


    const createItems = (object_) => {

        //hago la consulta a la base para traer los datos
        //para hacer la consulta, recorro items selected para traer los datos
        let rodales_select = {};

        object_.forEach((element, index) => {

            rodales_select[index] = element.objnr;

        });

        //console.log(rodales_select);

        const years_data = getYearsByIdRodal(rodales_select);

        const months_data = getMonthByRodales(rodales_select);

    }



    const onClickHandler = async () => {

        //evaluo si es active o no

       
        //antes de insertar en el itemselected consulto que no estekkl
        let exist = false;
        itemsSelected.forEach(element => {

            if (element.objnr == rodal.objnr) {
                exist = true;
            }
        });

        let object_ = [];
        if (!exist) {
            object_ = [...itemsSelected, rodal]

           

            insertInEmpresasSelected(rodal.idempresa);
            setItemsSelected(object_);

            createItems(object_);

         

            toast.success('El Rodal ha sido agregado!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            }); 
           //recargo el rodalREload
         
            setReloadSelected(!reloadSelected);

            
            //proceso las consultas
            setIsLoadingTcostos(false);
            setIsLoadingResumenCostos(false);
            setStatusMateriales(false);
            await processQuery(object_);
            setIsLoadingTcostos(true);


            //traigo los resumenes de costos
            //el resumen tmb deberia filtrar los materiales
            const res_costo = await getResumenCostosFunction(object_, [], [], []);


          
               //proceso tmb los materiales presentes
            const materiales_present = await getMaterialesByQueryFunction(object_, [], []);


            setMaterialesCurrent(materiales_present);
            setMaterialesReload(!materialesReload);

            setStatusMateriales(true);
            //se lo paso al resumen
          
            setResumenCostos(res_costo);
            setReloadResumenCostos(!reloadResumenCostos);
            setIsLoadingResumenCostos(true);


           //hago click en el rodal y tengo que quitar los actives de los years
           //setYearsSelected([]);
            setYearsSelected([]);

            setMonthSelected([]);

            setQueryYears(false);
            setQueryRodales(true);

        } else {
            //mando el mensaje
            toast.error('El Rodal ya se encuentra agregado!', {
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


    const processQuery = async (items_selected) => {


        const metadata = await getMetadataFunction(items_selected, [], [], []);


        if(metadata != false){
            //traigo los costos con la primer pagina
            const dataCostos_ = await getDataCostosFunction(items_selected, [], [], [], 1);
        

            if(dataCostos_ != false){
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



    const insertInEmpresasSelected = (idempresa) => {

        let is_present = false;
        empresasSelected.forEach(item => {

            if (item == idempresa) {
                is_present = true;
            }

        });

        if (is_present == false) {
            empresasSelected.push(idempresa);
        }
    }


    useEffect(() => {

    }, [])


    return (
        <>
            <a className="list-group-item list-group-item-action item-layer bg-dark" aria-current="true"
                attr="XOP-5632" rodal_id={idrodal} onClick={onClickHandler}>
                <RodalesIcon></RodalesIcon>
                {name_rodal}
            </a>

        </>
    )
}

export default ItemTabsRodalLi