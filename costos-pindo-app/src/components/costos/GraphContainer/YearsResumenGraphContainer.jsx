import React, { useEffect, useState } from 'react'

import LineChart from '../../graphics/LineChart'
import { getResumenCostosByYearsAPI } from '../../../utility/Querys'


const YearsResumenGraphContainer = () => {

    const [data, setData] = useState();
    const [reload, setReload] = useState(false);


    const getResumenCostos = async () => {

        const data_costos = await getResumenCostosByYearsAPI();

      
      
        let data_graphic = [];

        if(data_costos != null && data_costos.length > 0){
          
            data_costos.forEach(element => {

                data_graphic.push({'x' : element.year, 'y' : parseFloat(element.costo)});

               
                
            });
           
        } 

        setData(data_graphic);
 
        setReload(true);
        
    }


    useEffect(() => {

        if(!reload){

            getResumenCostos();

        }
       

    }, [reload])


    return (
        <LineChart title={'Resumen de Costos por Año ($)'} data_graphic={data} 
        name_serie={'Costos por Año ($)' } border_color={'rgb(255, 99, 132)'} 
        background_color={'rgba(255, 99, 132, 0.5)'} reload={reload}></LineChart>

    )
}

export default YearsResumenGraphContainer