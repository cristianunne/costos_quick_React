import React, { useContext, useEffect, useState } from 'react'
import EmpresasIcon from '../../icons/EmpresasIcon'
import ItemAcordionSelected from './ItemAcordionSelected'
import { ItemsGlobalContext } from '../../context/GlobalContext'


const AcordionBoxContainer = ({ cod_emp, name_empresa, rodal }) => {

    const { itemsSelected, setItemsSelected } = useContext(ItemsGlobalContext);

    const [items, setItems] = useState([]);

    const createItems = () => {

        let items_ = [];

        itemsSelected.forEach((element, index) => {

            if(element.idempresa == cod_emp){
                items_.push(<ItemAcordionSelected name_rodal={element.rodal} item={element} key={index}></ItemAcordionSelected>);
            }

        });
        setItems(items_);

    }



    useEffect(() => {

        createItems();

    }, [itemsSelected]);

    return (

        <div className="accordion-item bg-dark" attr="XOP-5632">
            <div className="accordion-items-right-1 item-container mb-1"
                id={'item-sidebar-' + cod_emp}>
                <h2 className="accordion-header header-forestal">
                    <a className="dropdown-item bg-azure text-azure-fg" href={"#collapse-itemsright-" + cod_emp}
                        data-bs-toggle="collapse" data-bs-target={"#collapse-itemsright-" + cod_emp} aria-expanded="true">
                        <div className="text-item-content p-1">{name_empresa}</div>
                        <div className="number-item-content p-1">

                            <EmpresasIcon></EmpresasIcon>
                        </div>

                    </a>
                </h2>

                <div id={"collapse-itemsright-" + cod_emp} className="collapse border-collapse"
                    data-bs-parent="#sr-items-container"
                >
                    <div id='items-container' className='bg-dark'>

                       {items}
                       
                    </div>
                </div>
            </div>
        </div>


    )
}

export default AcordionBoxContainer