import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import axios from 'axios';

const PieChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    
    try {
      const response = await axios.get('http://localhost:5000/api/users');
    setData(response.data.rows);
      console.log(response)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const options = {
    chart: {
      type: 'pie'
    },
    title: {
      text: 'Customer Types Distribution'
    },
    series: [{
      name: 'Customer Type',
      data: data.map(item => ({ name: item[0], y: item[1] }))
    }]
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default PieChart;
