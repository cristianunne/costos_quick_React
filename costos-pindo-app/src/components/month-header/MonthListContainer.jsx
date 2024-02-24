import React, { useEffect, useState, useContext } from 'react'
import MonthItem from './MonthItem';
import { QueryGlobalContext } from '../../context/GlobalContext';

const MonthListContainer = () => {

    const { yearsSelected, setYearsSelected, yearsPresent, setYearsPresent,
        isYearPresent, setIsYearPresent, yearsOfRodalesFilter, setYearsOfRodalesFilter,
        monthsSelected, setMonthSelected, monthsPresent, setMonthsPresent,
        isMonthPresent, setIsMonthPresent } = useContext(QueryGlobalContext);

    const months = [
        {
            text_month : 'Ene',
            number_month : 1
        },
        {
            text_month : 'Feb',
            number_month : 2
        },
        {
            text_month : 'Mar',
            number_month : 3
        },
        {
            text_month : 'Abr',
            number_month : 4
        },
        {
            text_month : 'May',
            number_month : 5
        },
        {
            text_month : 'Jun',
            number_month : 6
        },
        {
            text_month : 'Jul',
            number_month : 7
        },
        {
            text_month : 'Ago',
            number_month : 8
        },
        {
            text_month : 'Sep',
            number_month : 9
        },
        {
            text_month : 'Oct',
            number_month : 10
        },
        {
            text_month : 'Nov',
            number_month : 11
        },
        {
            text_month : 'Dic',
            number_month : 12
        },

    ]

    const [items, setItems] = useState([]);

    const createItems = () => {

        let it_ = []

        months.forEach((element, index) => {

            //recorro los months presentes y le paso el active

            let is_present = false;
            monthsPresent.forEach(mes => {

                //compruebo la existencia y los agrego
                if (mes == element.number_month) {
                    is_present = true;
                } 
            });

    
            it_.push(<MonthItem text_month={element.text_month} 
                number_month={element.number_month} key={index} isPresent={is_present}></MonthItem>);

        })

        setItems(it_);

    }



    useEffect(() => {

        createItems();

        //console.log('se reinicia months container');

    }, [isMonthPresent]);


    return (
        <div className="col-xl-6 d-flex gap-1 month-container justify-content-center pt-3" >

            {items}

        </div>
    )
}

export default MonthListContainer