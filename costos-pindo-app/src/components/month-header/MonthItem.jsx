import React, { useState } from 'react'
import CalendarIcon from '../../icons/CalendarIcon'

const MonthItem = ({text_month, number_month, isPresent}) => {

    //necesito una variable global que almacene la presencia o no de los meses en los rodales seleccionados

    const [active, setActive] = useState();


    return (

        <>
        {isPresent ? <button className="btn is_present btn-square btn-h-35 ps-1 pe-1 align-items-end btn-hover"
         
            style={!active ? null : styles.active}>
                 <CalendarIcon></CalendarIcon>
            {text_month}
        </button> :
            <button className="btn btn-outline-light btn-square btn-h-35 ps-1 pe-1 align-items-end btn-hover" 

                disabled
            
                style={!active ? null : styles.active}
                >
                     <CalendarIcon></CalendarIcon>
                {text_month}
            </button>
        }
    </>

    )
}

export default MonthItem


const styles = {
    active: {
        backgroundColor: '#206bc4',
        'color': '#e3e3e3'
    }
};