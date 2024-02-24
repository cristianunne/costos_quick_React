import React from 'react'
import TrashIcon from '../../icons/TrashIcon'

const ButtonIconRemove = ({onClickRemove}) => {
    return (
        <>
        <span onClick={onClickRemove}>
           <TrashIcon>

           </TrashIcon>
        </span>
        </>
    )
}

export default ButtonIconRemove