import React, { useEffect, useState } from 'react'
import { ICONOS } from '../../Iconos';
import RodalesIcon from '../../icons/RodalesIcon';
import EmpresasIcon from '../../icons/EmpresasIcon';
import MaterialesIcon from '../../icons/MaterialesIcon';

const ItemTabs = ({ icono, title, url, active_status }) => {

    const [active, setActive] = useState(false)

    const onClickHandler = () => {
        setActive(!active);
    }


    useEffect(() => {

        setActive(active_status);

    }, [active_status])

    return (
        <>
            <li className={`nav-item tabs-item`}  
            role={`${active_status ? 'presentacion' : null}`}
            onClick={onClickHandler} 
            >
                <a href={'#' + url} className={`nav-link  ${active_status ? 'active' : null}`} data-bs-toggle="tab">
                {icono == ICONOS.RODALES ? <RodalesIcon/> : null}
                {icono == ICONOS.EMPRESAS ? <EmpresasIcon/> : null}
                {icono == ICONOS.MATERIALES ? <MaterialesIcon/> : null}
                    {title}
                </a>
            </li>
        </>
    )
}

export default ItemTabs