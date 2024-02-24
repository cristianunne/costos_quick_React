import React, { useContext, useEffect, useState } from 'react'
import { ItemsGlobalContext, QueryGlobalContext } from '../../context/GlobalContext';
import { getDataByYearsAPI } from '../../utility/Querys';

const YearItem = ({ year, isPresent, has_rodales_select }) => {

    const { itemsSelected, setItemsSelected, reloadSelected, setReloadSelected,
        empresasSelected, setEmpresasSelected } = useContext(ItemsGlobalContext);

    const { yearsSelected, setYearsSelected, yearsPresent, setYearsPresent } = useContext(QueryGlobalContext);

    const [active, setActive] = useState(false);

    const [yearsObject, setYearsObject] = useState({});

    //estado usado en marcarse si esta prsente o no

    const [btn, setBtn] = useState('');



    const getDataByYears = async (data) => {

        const data_result = await getDataByYearsAPI(data);

        //console.log(data_result);
        //convertToObject();

    }

    const convertToObject = (year) => {

        let obj = {};
        let index_ = null;

        yearsSelected.forEach((el, index) => {

            obj[index] = el;
            //console.log(obj);ted, yearsPresent, setYearsPresent, 
            index_ = index;
        });
        index_++;
        //console.log(obj);
        //console.log(yearsObject);
        obj[index_] = year;

        return obj;


    }


    const onClickHandler = () => {

        //si hago click, busco los datos considerando las selecciones actuales
        //si no hay seleccion actual, tengo que filtrar todos los datos con este year
        if (!active) {
            //consulto por los items sellected
            if (itemsSelected.length > 0) {

                //console.log(itemsSelected);


            } else {
                //como no habia elementos selecionados, fitro todos los datos con el year
                //creo una variable global para que puedan acceder los years

                addYearSelect(year);
                let years_obj = convertToObject(year);

                //getDataByYears(years_obj);

            }

        } else {
            //como esta activo, quito la seleccion.
            removeYearSelect(year);


        }

        setActive(!active);

    }


    const addYearSelect = (year) => {

        let exists = false;

        yearsSelected.forEach(element => {

            if (element == year) {
                exists = true;
            }

        });

        if (!exists) {

            setYearsSelected([...yearsSelected, year]);


        }

    }

    const removeYearSelect = (year) => {
        let item_ = [];

        yearsSelected.forEach(element => {

            if (element != year) {
                item_.push(element);
            }

        });

        setYearsSelected(item_);


    }

    useEffect(() => {
        //console.log(yearsObject);
        //console.log(yearsSelected);

    }, [active]);

    return (
        <>
            {isPresent ? <button className="btn is_present btn-square btn-h-35 btn-hover" onClick={onClickHandler}
                style={!active ? null : styles.active}>
                {year}
            </button> :

                has_rodales_select ?

                    <button className="btn btn-outline-light btn-square btn-h-35 btn-hover" onClick={onClickHandler}
                        style={!active ? null : styles.active} disabled>
                        {year}
                    </button>
                    :
                    <button className="btn btn-outline-light btn-square btn-h-35 btn-hover" onClick={onClickHandler}
                        style={!active ? null : styles.active}>
                        {year}
                    </button>
            }
        </>


    )
}

export default YearItem


const styles = {
    active: {
        backgroundColor: '#206bc4',
        'color': '#e3e3e3'
    }
};