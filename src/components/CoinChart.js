import moment from 'moment'

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
 
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

function CoinChart(props)


{
    const {historyData,coinData}= props
    const options = {
    responsive: true,
   
  };

  const data = {
    labels: Object.values(historyData).map(value => moment(value.x).format('MMMDD')),
    datasets: [
      {
        fill : true,
        label : coinData.name,
        data: Object.values(historyData).map(value => value.y),
        
        borderColor: 'rgb(255, 99, 132)',
       
      },
    ],
  };
  return (
    <div><Line options={options} data={data}></Line></div>
  )
}

export default CoinChart