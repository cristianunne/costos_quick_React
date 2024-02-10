import React, { useState, useContext } from 'react'
import { ItemsGlobalContext } from '../../context/GlobalContext';
import RodalesIcon from '../../icons/RodalesIcon';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ItemTabsRodalLi = ({ name_rodal, idrodal, rodal }) => {

    const [active, setActive] = useState();

    const { itemsSelected, setItemsSelected, reloadSelected, setReloadSelected, empresasSelected, setEmpresasSelected } = useContext(ItemsGlobalContext);

    const onClickHandler = () => {

        //antes de insertar en el itemselected consulto que no estekkl
        let exist = false;
        itemsSelected.forEach(element => {

            if (element.objnr == rodal.objnr) {
                exist = true;
            }
        });
        let object_ = null;
        if (!exist) {
            object_ = [...itemsSelected, rodal]
            //console.log(object_);

            insertInEmpresasSelected(rodal.idempresa);



            setItemsSelected(object_);

            if (reloadSelected) {
                setReloadSelected(false);
            } else {
                setReloadSelected(true);
            }
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


    return (
        <>
        <a className="list-group-item list-group-item-action item-layer bg-dark" aria-current="true"
            attr="XOP-5632" rodal_id={idrodal} onClick={onClickHandler}>
            <RodalesIcon></RodalesIcon>
            {name_rodal}
        </a>
        <ToastContainer />

        </>
    )
}

export default ItemTabsRodalLi