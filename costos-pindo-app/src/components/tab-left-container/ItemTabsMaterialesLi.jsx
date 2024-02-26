import React from 'react'
import MaterialesIcon from '../../icons/MaterialesIcon';

const ItemTabsMaterialesLi = ({material}) => {


    return (
        <a className="list-group-item list-group-item-action item-layer" aria-current="true"
            attr="XOP-5632" rodal_id="1" onClick={null}>
            <MaterialesIcon></MaterialesIcon>
            {material}
        </a>
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