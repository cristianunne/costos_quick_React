import React, { useEffect, useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import GraphicsPlaceHolder from '../placeholders/costos/GraphicsPlaceHolder';




ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);





/*export const data = {
  datasets: [
    {
      label: 'Dataset 1',
      data: [{x: '2016-12-25', y: 20}, {x: '2016-12-26', y: 10}],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    }
  ],
};*/




const LineChart = ({ title, labels, data_graphic, name_serie, border_color, background_color, reload }) => {


  const [data, setData] = useState(null);
  const [isReload, setIsReload] = useState(false);


  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: title,
        font : {weight: 'bold', size: 16},
      },
    },
  };


  const createDataset = () => {

    if (!isReload) {
      setData({

        datasets: [
          {
            label: name_serie,
            data: data_graphic,
            borderColor: border_color,
            backgroundColor: background_color,
          }
        ],

      });
      setIsReload(true);

    }

  }

  useEffect(() => {

  
    if(data_graphic != null){

      createDataset();

    }
    
  }, [data_graphic, isReload])


  return <> {data != null ? <Line options={options} data={data} /> : <GraphicsPlaceHolder></GraphicsPlaceHolder>} </>
}

export default LineChart