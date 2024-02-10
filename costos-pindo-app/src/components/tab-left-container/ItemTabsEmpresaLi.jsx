import React, { useContext, useEffect, useState } from 'react'
import EmpresasIcon from '../../icons/EmpresasIcon'
import { getRodalesByEmpresasAPI } from '../../utility/Querys';
import StyleSheet from 'react';
import { GlobalContext } from '../../context/GlobalContext';


const ItemTabsEmpresaLi = ({ name_empresa, idempresa, rodales, setRodales, rodalesDinamic, idEmpresa, setIdEmpresa, 
    setRodalesActually}) => {

    const [active, setActive] = useState(false);

    const [rodalesFilter, setRodalesFilter] = useState();

    const {rodalReload, setRodalReload, reloadEmpresa, setReloadEmpresa, numberActive, setNumberActive} = useContext(GlobalContext);


    //metodo que procesay filtra los rodales
    const onClickHandler = async () => {

        if (!active) {
            console.log('click');
            //llamo al metodo que trae los datos
            const rodal_filter = await getRodalesByEmpresasAPI(idempresa);

            console.log('click despues');

            if (rodal_filter) {
                //console.log('click filter');
                //console.log(rodal_filter);

                _filterRodales(rodal_filter);
                setActive(true);
                let num = numberActive + 1;
                setNumberActive(num);
             
            }

        } else {
            alert('seapreto');
            setActive(false);

        }



    }


    const onClickEmpresa = () => {

        if (!active) {

            filterRodales();
        
        } else {

        }

    }

    const filterRodales = () => {
        //console.log(rodalesDinamic);

        if (rodalesDinamic != null) {
            let resultadoFiltro = rodalesDinamic.filter((elemento) => {

                if (elemento.idempresa.toString() == idempresa) {

                    return elemento;

                }
            });

            console.log(resultadoFiltro);

            //tengo que revisar 
            setRodalesActually(resultadoFiltro);
            uploadRodales(resultadoFiltro);
            setIdEmpresa(idempresa);

            //setRodales(resultadoFiltro);
            if(rodalReload){
                setRodalReload(false);
            } else {
                setRodalReload(true);
            }

            if(reloadEmpresa){
                setReloadEmpresa(false);
            } else {
                setReloadEmpresa(true);
            }
          
        
            
        } else {
            console.log('vaciooo el dinamic');
        }

    }

    const _filterRodales = (rodal_filter) => {

        if (rodalesDinamic != null) {
            let resultadoFiltro = rodalesDinamic.filter((elemento) => {

                for (let i = 0; i < rodal_filter.length; i++) {
                    if (rodal_filter[i].idrodal.toString() === elemento.objnr.toString()) {

                        return elemento;

                    }
                }
            });

            //tengo que revisar 

            uploadRodales(resultadoFiltro);
            setIdEmpresa(idempresa);

            //setRodales(resultadoFiltro);
            if(rodalReload){
                setRodalReload(false);
            } else {
                setRodalReload(true);
            }

            if(reloadEmpresa){
                setReloadEmpresa(false);
            } else {
                setReloadEmpresa(true);
            }
          
        
            
        } else {
            console.log('vaciooo');
        }

    }

    const uploadRodales = (rodalesFilter) => {

        if(numberActive == 0){

            //no hay items activos
            setRodales(rodalesFilter);

        } else {
            //hay activo, entonces sumo a los rodales
            console.log('entro aca');
            setRodales(rodalesFilter);

            //tengo que apagar todos los demas
        }


    }




    useEffect(() => {

        if(idEmpresa != null){
            if(idEmpresa.toString() != idempresa.toString()){
                setActive(false);
            } else {
                setActive(true);
            }
        }
        //console.log('Rodales DInamic');
        //console.log(rodalesDinamic);
      

    })


    return (
        <a className="list-group-item list-group-item-action item-layer" aria-current="true"
            style={active ? styles.active : styles.no_active}
            attr="XOP-5632" rodal_id="1" onClick={onClickEmpresa}>
            <EmpresasIcon></EmpresasIcon>
            {name_empresa}
        </a>
    )


}

export default ItemTabsEmpresaLi


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

