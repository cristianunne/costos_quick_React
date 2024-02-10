import React, { useContext } from 'react'
import TrashIcon from '../../icons/TrashIcon'
import { ItemsGlobalContext } from '../../context/GlobalContext';

const ItemAcordionSelected = ({name_rodal, item}) => {

    const {itemsSelected, setItemsSelected, reloadSelected, setReloadSelected, 
        empresasSelected, setEmpresasSelected} = useContext(ItemsGlobalContext);




    const onClickHandler = () => {

        let items_ = [];

        itemsSelected.forEach(ele => {

            if(item.objnr != ele.objnr){
                items_.push(ele);
            }

        });

        setItemsSelected(items_);

    }



    return (
        <div className="list-group list-group-flush d-flex bg-dark">
        <div class="list-group-item list-group-item-action d-flex item-list bg-dark text-white" aria-current="true">
            <div class="text-item-content p-1 d-flex flex-column 
            align-items-start justify-content-center">{name_rodal} </div>
           
            <div class="number-item-content p-1 icon-subitem" onClick={onClickHandler}>

                <TrashIcon></TrashIcon>

            </div>
        </div>
    </div>
    )
}

export default ItemAcordionSelected