import React, { useContext, useEffect, useState } from 'react'
import MaterialesIcon from '../../icons/MaterialesIcon';
import { GlobalDataContext, ItemsGlobalContext, QueryGlobalContext, SelectedQueryGlobalContext } from '../../context/GlobalContext';
import { getDataCostosFunction, getMaterialesByQueryFunction, getMetadataFunction, getResumenCostosFunction } from '../QuerysFunctions';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ItemTabsMaterialesLi = ({material, is_present, idmaterial, is_active}) => {


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

    const [active, setActive] = useState();
    const [activeAux, setActiveAux] = useState(false);
    const [idMaterial, setIdMaterial] = useState();



    const onClickHandler = async () => {

       
        //reviso si esta activo o no
        if(!active){

            toast.success('El Material "' + material + '" ha sido incuido del Filtro!', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            }); 

            //no esta activo, entonces agrego a la lista el item seleccionado
            let new_mat_lista = [...materialesSelected, idmaterial];
            setMaterialesSelected(new_mat_lista);

            let mat_objects = convertToObjectItems(new_mat_lista);
          

              //aca deberia revisar el tipo de consulta

            if(queryRodales){

                alert('queryRodales');

            } else if (queryYears){
                alert('queryYears');

                //tengo que hacer el query usando los yearsSelected y los materiales
                console.log(yearsSelected);
                console.log(mat_objects);

                let yearsObject = convertToObjectItems(yearsSelected);

                //tmb tengo que pasar los meses seleccionados
                let monthObject = convertToObjectItems(monthsSelected);



                setIsLoadingTcostos(false);
                setIsLoadingResumenCostos(false);
              
            
                await processQuery([], yearsObject, monthObject, mat_objects);

                  //traigo los resumenes de costos
                const res_costo = await getResumenCostosFunction([], yearsObject, monthObject, mat_objects);
                  //se lo paso al resumen
              
                setResumenCostos(res_costo);
                setReloadResumenCostos(!reloadResumenCostos);

                setIsLoadingResumenCostos(true);
                setIsLoadingTcostos(true);



            } else {

                alert('nada seleccionado, hago el friltro por materiales');
                //debo hacer una seleccion por materiales, pero puede suceder varias cosas

                //traigo los costos solo pasando la lista de materiales
                //Sempre va a haber 1 material en lalista
                 //hago la consulta solo con los rodales
                setIsLoadingTcostos(false);
                setIsLoadingResumenCostos(false);
                 //setStatusMateriales(false);

                await processQuery([], [], [], mat_objects);

                //traigo los resumenes de costos
                const res_costo = await getResumenCostosFunction([], [], [], mat_objects);
                //se lo paso al resumen
              
                setResumenCostos(res_costo);
                setReloadResumenCostos(!reloadResumenCostos);

                setIsLoadingResumenCostos(true);
                setIsLoadingTcostos(true);


            }

        } else {

            toast.error('El Material "' + material + '" ha sido quitado del Filtro!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });

            let materiales_ = deleteMaterialFromListSelected(idMaterial);
            let mat_objects = convertToObjectItems(materiales_);


            if(queryRodales){

            } else if(queryYears){


                let yearsObject = convertToObjectItems(yearsSelected);

                setIsLoadingTcostos(false);
                setIsLoadingResumenCostos(false);
               

                await processQuery([], yearsObject, [], mat_objects);

                  //traigo los resumenes de costos
                const res_costo = await getResumenCostosFunction([], yearsObject, [], mat_objects);
                  //se lo paso al resumen
              
                setResumenCostos(res_costo);
                setReloadResumenCostos(!reloadResumenCostos);

                setIsLoadingResumenCostos(true);
                setIsLoadingTcostos(true);


            } else {

                //cuento la lista de materiales si es 0, dejo vacio la tabla costos

                if(materiales_.length > 0){

        
                    setIsLoadingTcostos(false);
                    setIsLoadingResumenCostos(false);
                    //setStatusMateriales(false);
        
                    await processQuery([], [], [], mat_objects);

                    //traigo los resumenes de costos
                    const res_costo = await getResumenCostosFunction([], [], [], mat_objects);
                    //se lo paso al resumen
                
                    setResumenCostos(res_costo);
                    setReloadResumenCostos(!reloadResumenCostos);

                    setIsLoadingResumenCostos(true);
                    setIsLoadingTcostos(true);

                } else {

                //aca controlo que el query no sea ni por years ni por rodales
                //si lo es, pongo el estado inicialde carga
                
                    setIsLoadingTcostos(false);
                    setIsLoadingResumenCostos(false);
                    setNumberData(null)
                    setPages(null);
                    setDataCostos([]);
                    setDataCostosDinamic([]);

                }


            }

          
         

            

        
        }

      

        setActive(!active);

    }

    const processQuery = async (rodalesSel, yearsSel, monthSel, matSel) => {


        const metadata = await getMetadataFunction(rodalesSel, yearsSel, monthSel, matSel);

        if(metadata != false){
            //traigo los costos con la primer pagina
            const dataCostos_ = await getDataCostosFunction(rodalesSel, yearsSel, monthSel, matSel, 1);
            console.log('dataCostos_');
            console.log(dataCostos_);

            if(dataCostos_ != false){
                //console.log(dataCostos_);
    
                //seteo el numero de paginas y de 
                setNumberData(metadata.cantidad)
                setPages(metadata.pages);
                setDataCostos(dataCostos_);
                setDataCostosDinamic(dataCostos_);

                //deberia procesar los materiales
        
            } else {

                setNumberData(null)
                setPages(null);
                setDataCostos([]);
                setDataCostosDinamic([]);

            }

        }

    }

    const deleteMaterialFromListSelected = (idmaterial_) => {

        let materiales_ = [];

        materialesSelected.forEach(element => {

            if(element != idmaterial_){

                materiales_.push(element);

            }

        });

        setMaterialesSelected(materiales_);

        return materiales_;


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

    useEffect(() => {
        setIdMaterial(idmaterial);

        if(!activeAux){
      
            setActive(is_active);
            setActiveAux(!activeAux);

        } else {
           
            if(materialesSelected.length <= 0){
                setActive(false);

            }
        }
        

    }, [active, materialesReload])

    return (

        <>
            {is_present ? <a className="list-group-item list-group-item-action item-layer is_present" aria-current="true"
                        attr="XOP-5632" rodal_id="1" onClick={onClickHandler}  style={!active ? null : styles.active}>
                        <MaterialesIcon></MaterialesIcon>
                        {material}
                    </a> : 
                    <a className="list-group-item list-group-item-action item-layer" aria-current="true"
                    attr="XOP-5632" rodal_id="1" onClick={onClickHandler}  style={!active ? null : styles.active}>
                    <MaterialesIcon></MaterialesIcon>
                    {material}
                </a>
            }
        </>
        
    )
}

export default ItemTabsMaterialesLi


const styles = {
    active: {
        backgroundColor: '#206bc4',
        color: '#FFFFFF'
    },
    no_active: {
        backgroundColor: '#182433',
        color: '#ffffff',
    }
};