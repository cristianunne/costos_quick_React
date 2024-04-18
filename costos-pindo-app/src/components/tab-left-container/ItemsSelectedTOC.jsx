import React, { useEffect, useState, useContext } from 'react'

import '../../styles/TabLeftContainer/TabLeftContainer.css'
import AcordionBoxContainer from './AcordionBoxContainer';
import { ItemsGlobalContext } from '../../context/GlobalContext';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ItemsSelectedTOC = ({ empresas, reloadToc }) => {

    const [listItems, setListItems] = useState();
    const [reload, setReload] = useState(false);

    const { itemsSelected, setItemsSelected, reloadSelected, setReloadSelected,
        empresasSelected, setEmpresasSelected } = useContext(ItemsGlobalContext);



    const createItemsAcordion = () => {

        let items_ = [];
        empresasSelected.forEach((value, index) => {

            //console.log(value);
            empresas.forEach(ele => {

                if (value.toString() == ele.idempresa.toString()) {
                    items_.push(<AcordionBoxContainer cod_emp={value} name_empresa={ele.nombre} 
                        
                        key={index} reload={reload}></AcordionBoxContainer>);
                }

            });


        });

        setListItems(items_);
        setReload(!reload);

    }

    const redirect = () => {

        if(itemsSelected.length > 0){
          let params = new URLSearchParams();
    
          //recorro los rodales y contruyo la utl
          params.append('number_objects', itemsSelected.length);
    
          itemsSelected.forEach((element, index) => {
            console.log(element);
            let name_key = 'rodal_' + index;
            params.append(name_key, element.objnr);
          })
    
          let url = "http://127.0.0.1:8000/gis/view-gis-by-rodales?" + params.toString();
          window.open(url, '_blank');
    
        } else {
    
          toast.error('No se han seleccionado Rodales', {
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
    

    useEffect(() => {

        createItemsAcordion();
        
    }, [reloadSelected])



    return (
        <div id='items-container-TOC'>

            <div id='title-selection-section'>
                <h3 className="h2-content-section bg-indigo text-blue-fg text-center">Selección Actual</h3>
            </div>

            <div id='title-selection-section'>
                <div className="map-show-link-container bg-dark text-dark-fg d-flex justify-content-between align-items-center pe-2">
                    <h5 className="text-dark-fg mb-0 p-2 me-2">Ver Rodales Seleccionado en el Mapa</h5>

                    <svg xmlns="http://www.w3.org/2000/svg" id='btn-view-map' width="32" height="32" onClick={redirect}
                    viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M3 7l6 -3l6 3l6 -3v13l-6 3l-6 -3l-6 3v-13" />
                    <path d="M9 4v13" /><path d="M15 7v13" /></svg>
                </div>
            </div>

            <div id='toc-sub-container'>

                <div className="my-2 my-md-0 flex-grow-1 flex-md-grow-0 order-first order-md-last">
                    <div id="sr-items-container" className="accordion">

                        {listItems}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ItemsSelectedTOC