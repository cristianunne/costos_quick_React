import React, { useContext, useEffect, useState } from 'react'
import { GlobalDataContext, ItemsGlobalContext, QueryGlobalContext, SelectedQueryGlobalContext } from '../../context/GlobalContext';
import { getDataByYearsAPI, getMonthsByYearsAPI, getMonthsOfRodalesDataAPI } from '../../utility/Querys';
import { getDataCostosFunction, getMaterialesByQueryFunction, getMetadataFunction, getResumenCostosFunction } from '../QuerysFunctions';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const YearItem = ({ year, isPresent, has_rodales_select}) => {

    const { itemsSelected, setItemsSelected, reloadSelected, setReloadSelected,
        empresasSelected, setEmpresasSelected } = useContext(ItemsGlobalContext);


        const { queryRodales, setQueryRodales,
            queryYears, setQueryYears,
            queryMonth, setQueryMonth,
            queryMateriales, setQueryMateriales} = useContext(SelectedQueryGlobalContext);


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



    const [active, setActive] = useState(false);

    const [yearsObject, setYearsObject] = useState({});

    //estado usado en marcarse si esta prsente o no

    const [btn, setBtn] = useState('');



    const getDataByYears = async (data) => {registros

        const data_result = await getDataByYearsAPI(data);

        console.log(data_result);
        //convertToObject();

    }

    const getMonthByYears = async (years, is_reset) => {

        const arrFromObj = Object.keys(years);


        if(arrFromObj.length > 0){

          
            const months_data = await getMonthsByYearsAPI(years);

    
            let monthsPresent_aux = [];
            if(!is_reset){
                monthsPresent_aux = [...monthsPresent];
            }
    
    
            if(months_data != null && months_data != false){
    
            
                let months_ = [];
                let new_months = [];
    
    
                if(months_data.length > 0){
    
                    months_data.forEach(element => {
    
                  
    
                        //verifico que el elemento este o no presente en el global
                        let is_present = false;
        
                        //si months_ es 0 significa que no tiene elementos entonces solo agrego
                        if (monthsPresent_aux.length == 0) {
                            months_.push(parseInt(element.month));
        
                        } else {
        
                            monthsPresent_aux.forEach(month_el => {
        
                                let mes = parseInt(month_el);
        
                                if (mes == element.month) {
                                    is_present = true;
                                }
        
                            });
        
        
                            if (!is_present) {
                                months_.push(parseInt(element.month));
        
                            }
                        }
        
                    });
        
                    new_months = [...monthsPresent_aux, ...months_];
        
                    setMonthsPresent(new_months);
        
                    setIsMonthPresent(!isMonthPresent);
    
                }
              
    
    
            }
          

        } else {
            //limpio los month
            setMonthsPresent([]);
            setIsMonthPresent(!isMonthPresent);

            
        }

       
       

    }

    const convertToObject = (year) => {

        let obj = {};
        let index_ = null;

        yearsSelected.forEach((el, index) => {

            obj[index] = el;
            //console.log(obj);ted, yearsPresent, setYearsPresent, 
            index_ = index;
        });
        index_++;
        //console.log(obj);
        //console.log(yearsObject);
        obj[index_] = year;

        return obj;


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


    const onClickHandler = async () => {

        //si hago click, busco los datos considerando las selecciones actuales
        //si no hay seleccion actual, tengo que filtrar todos los datos con este year
       
        if (!active) {

            toast.success('El Año ha sido incuido del Filtro!', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            }); 

            //tengo que limpiar los materiales selected y quizas los meses
            setMaterialesSelected([]);
            setMonthSelected([]);

            //consulto por los items sellected
            if (itemsSelected.length > 0) {

                //console.log(itemsSelected);
                //habia eementos seleccionado como rodales, entonces tengo que usarlos para filtrar
                addYearSelect(year);
                let years_obj = convertToObject(year);

                //cuando selecciono esto, hago el query
                setIsLoadingTcostos(false);
                setIsLoadingResumenCostos(false);
                setStatusMateriales(false);

                await processQuery(itemsSelected, years_obj);
                setIsLoadingTcostos(true);

                 //traigo los resumenes de costos
                const res_costo = await getResumenCostosFunction(itemsSelected, years_obj, [], []);
                //se lo paso al resumen
            
                setResumenCostos(res_costo);
                setReloadResumenCostos(!reloadResumenCostos);
                setIsLoadingResumenCostos(true);


                   //proceso tmb los materiales presentes
                const materiales_present = await getMaterialesByQueryFunction(itemsSelected, years_obj, []);


                setMaterialesCurrent(materiales_present);
                setMaterialesReload(!materialesReload);
   
                setStatusMateriales(true);

                //tengo que revisar el tema de los meses
                 //traigo los meses
                 getMonthByYears(years_obj, true);

                 //tengo que actualizar la tabla de costos resumen


            } else {
                //como no habia elementos selecionados, fitro todos los datos con el year
                //creo una variable global para que puedan acceder los years

                //el tema es que la cantidad de datos puede ser enorme, por eso, tengo que traer paginado
             
                addYearSelect(year);
                let years_obj = convertToObject(year);

                //tengo que traer los meses presentes

                setIsLoadingTcostos(false);
                setIsLoadingResumenCostos(false);
                setStatusMateriales(false);



                await processQuery([], years_obj);
                setIsLoadingTcostos(true);

                //tengo que actualizar la tabla de costos resumen

                 //traigo los resumenes de costos
                 const res_costo = await getResumenCostosFunction([], years_obj, [],[]);
                 //se lo paso al resumen
             
                 setResumenCostos(res_costo);
                 setReloadResumenCostos(!reloadResumenCostos);
                 setIsLoadingResumenCostos(true);

                //getDataByYears(years_obj);

                //traigo los meses
                getMonthByYears(years_obj, true);

                //no hay rodaes seleccionado, configuro el query
                if(itemsSelected.length <= 0){
                    setQueryYears(true);

                }
              

                 //proceso tmb los materiales presentes
                const materiales_present = await getMaterialesByQueryFunction([], years_obj, []);


                setMaterialesCurrent(materiales_present);
                setMaterialesReload(!materialesReload);

                setStatusMateriales(true);

            }

        //else que evalua cunado esta activo el boton
        } else {

            toast.error('El Año ha sido quitado del Filtro!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });

            setMaterialesSelected([]);
            setMonthSelected([]);

            //como esta activo, quito la seleccion.
            let new_years = removeYearSelect(year);


            //vuelvo a hacer la llamada al query process
            let years_obj = convertToObjectItems(new_years);

            //verifico que los years no esten vaciosregistros

            const arrFromObj = Object.keys(years_obj);

            //aca deberia revisar si estoy haciendo desde rodales selected o no
            if(itemsSelected.length > 0){

                //si los years selected es 0, entonces restaurosiguiendo los rodales
                if(arrFromObj.length <= 0){


                    //hago la consulta solo con los rodales
                    setIsLoadingTcostos(false);
                    setIsLoadingResumenCostos(false);
                    setStatusMateriales(false);


                    await processQuery(itemsSelected, []);
                    setIsLoadingTcostos(true);

                     //traigo los resumenes de costos
                    const res_costo = await getResumenCostosFunction(itemsSelected, [], [], []);
                     //se lo paso al resumen
                 
                    setResumenCostos(res_costo);
                    setReloadResumenCostos(!reloadResumenCostos);
                  

                    let years_obj_ = convertToObjectItems(yearsPresent);

                    //tengo que traer nuevamente

                    const materiales_present = await getMaterialesByQueryFunction(itemsSelected, [], []);

                    setMaterialesCurrent(materiales_present);
                    setMaterialesReload(!materialesReload);

                    setStatusMateriales(true);
                    setIsLoadingResumenCostos(true);



                    //verifico que los years no esten vaciosregistros
                    getMonthByYears(years_obj_, true);

                      //tengo que actualizar la tabla de costos resumen

                } else {

                    //proceso con rodales activos y years activos
                    //habia years selected
                    //hago la consulta solo con los rodales
                    setIsLoadingTcostos(false);
                    setIsLoadingResumenCostos(false);
                    setStatusMateriales(false);

                    await processQuery(itemsSelected, []);
                    setIsLoadingTcostos(true);
                    
               
                    //traigo los resumenes de costos
                    const res_costo = await getResumenCostosFunction(itemsSelected, years_obj, [], []);
                    //se lo paso al resumen

                    setResumenCostos(res_costo);
                    setReloadResumenCostos(!reloadResumenCostos);
                    setIsLoadingResumenCostos(true);


                    const materiales_present = await getMaterialesByQueryFunction(itemsSelected, years_obj, []);


                    setMaterialesCurrent(materiales_present);
                    setMaterialesReload(!materialesReload);

                    setStatusMateriales(true);


                    getMonthByYears(years_obj, true);

                    
                    
                    //tengo que actualizar la tabla de costos resumen

                     //proceso tmb los materiales presentes
                  
                }

 
            } else {


                if(arrFromObj.length > 0){
                    //cuando selecciono esto, hago el query
                  
                    setIsLoadingTcostos(false);
                    setIsLoadingResumenCostos(false);

                    setStatusMateriales(false);

                    await processQuery([], years_obj);
                    setIsLoadingTcostos(true);

                    //traigo los resumenes de costos
                    const res_costo = await getResumenCostosFunction([], years_obj, [], []);
                    //se lo paso al resumen
                
                    setResumenCostos(res_costo);
                    setReloadResumenCostos(!reloadResumenCostos);
                    setIsLoadingResumenCostos(true);



                    const materiales_present = await getMaterialesByQueryFunction([], years_obj, []);


                    setMaterialesCurrent(materiales_present);
                    setMaterialesReload(!materialesReload);

                    setStatusMateriales(true);



                } else {
                   
                    setIsLoadingTcostos(false);
                    setStatusMateriales(false);

                    setNumberData(0)
                    setPages(0);
                    setDataCostos([]);
                    setDataCostosDinamic([]);

                    setIsLoadingResumenCostos(false);
                    setResumenCostos([]);
                    setReloadResumenCostos(!reloadResumenCostos);


                    setMaterialesCurrent([]);
                    setMaterialesReload(!materialesReload);

                    setStatusMateriales(true);
                    setQueryYears(false);
                
    
                }


            
                //tengo que limpiar tmb los meses

                //traigo los meses
                //getMonthByYears(years_obj);

                getMonthByYears(years_obj, true);

            }


        }

        setActive(!active);
     
    }


    const processQuery = async (rodalesSelected, yearsSelected) => {


        const metadata = await getMetadataFunction(rodalesSelected, yearsSelected, [], []);

        if(metadata != false){
            //traigo los costos con la primer pagina
            const dataCostos_ = await getDataCostosFunction(rodalesSelected, yearsSelected, [], [], 1);

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




    const addYearSelect = (year) => {

        let exists = false;

        yearsSelected.forEach(element => {

            if (element == year) {
                exists = true;
            }

        });

        if (!exists) {

            setYearsSelected([...yearsSelected, year]);


        }

    }

    const removeYearSelect = (year) => {
        let item_ = [];

        yearsSelected.forEach(element => {

            if (element != year) {
                item_.push(element);
            }

        });

        setYearsSelected(item_);

        return item_;

    }

    useEffect(() => {
      
        //recorro el years items
       
        if((yearsSelected.length == 0 || yearsSelected == null) && active){

            setActive(false);

        }


    }, [active, yearsSelected]);

    return (
        <>
            {isPresent ? <button className="btn is_present btn-square btn-h-35 btn-hover" onClick={onClickHandler}
                style={!active ? null : styles.active}>
                {year}
            </button> :

                has_rodales_select ?

                    <button className="btn btn-outline-light btn-square btn-h-35 btn-hover" onClick={onClickHandler}
                        style={!active ? null : styles.active} disabled>
                        {year}
                    </button>
                    :
                    <button className="btn btn-outline-light btn-square btn-h-35 btn-hover" onClick={onClickHandler}
                        style={!active ? null : styles.active}>
                        {year}
                    </button>
            }
        </>


    )
}

export default YearItem


const styles = {
    active: {
        backgroundColor: '#206bc4',
        color: '#e3e3e3'
    }
};