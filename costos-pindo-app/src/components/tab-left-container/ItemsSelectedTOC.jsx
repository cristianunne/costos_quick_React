import React, { useEffect, useState, useContext } from 'react'

import '../../styles/TabLeftContainer/TabLeftContainer.css'
import AcordionBoxContainer from './AcordionBoxContainer';
import { ItemsGlobalContext } from '../../context/GlobalContext';

const ItemsSelectedTOC = ({ empresas, reloadToc }) => {

    const [listItems, setListItems] = useState();

    const { itemsSelected, setItemsSelected, reloadSelected, setReloadSelected,
        empresasSelected, setEmpresasSelected } = useContext(ItemsGlobalContext);



    const createItemsAcordion = () => {

        let items_ = [];
        empresasSelected.forEach((value, index) => {

            //console.log(value);
            empresas.forEach(ele => {

                if (value.toString() == ele.idempresa.toString()) {
                    items_.push(<AcordionBoxContainer cod_emp={value} name_empresa={ele.nombre} 
                        
                        key={index}></AcordionBoxContainer>);
                }

            });


        });

        setListItems(items_);

    }

    useEffect(() => {

        createItemsAcordion();
        console.log('Items selected');
        console.log(itemsSelected);


    }, [reloadSelected, reloadToc])



    return (
        <div id='items-container-TOC'>

            <div id='title-selection-section'>
                <h3 className="h2-content-section bg-indigo text-blue-fg text-center">Selección Actual</h3>
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