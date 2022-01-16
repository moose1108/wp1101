import React, { useState, useEffect } from 'react';
import { DatePicker, Input } from 'antd';
import moment from "moment";
import ReactApexChart from "react-apexcharts";
import axios from '../axios.js'

const options = {
    chart: { toolbar: { show: true }},
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 225,
         hollow: { 
           margin: 0, size: '70%', background: '#fff', image: undefined, 
           imageOffsetX: 0, imageOffsetY: 0, position: 'front',
           dropShadow: { enabled: true, top: 3, left: 0, blur: 4, opacity: 0.24 }
        },
        track: {
          background: '#fff',
          strokeWidth: '67%',
          margin: 0, // margin is in pixels
          dropShadow: { enabled: true, top: -3, left: 0, blur: 4, opacity: 0.35 }
        },
        dataLabels: {
          show: true,
          name: { offsetY: -10, show: true, color: '#888', fontSize: '17px'},
          value: {
            formatter: function(val) {
              return parseInt(val);
            },
            color: '#111',
            fontSize: '36px',
            show: true,
          }
        }
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'horizontal',
        shadeIntensity: 0.5,
        gradientToColors: ['#ABE5A1'],
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100]
      }
    },
    stroke: {
      lineCap: 'round'
    },
    labels: ['Percent'],
};

const Budget = ({ username }) => {
  const [Date, setDate] = useState(moment());
  const [labels,setLabels] = useState([]);
  const [type1, setType1] = useState(-1);
  const [BudgetData, setBudgetData] = useState([]);
  const [total, setTotal] = useState(0);
  const [bud, setBud] = useState(100000000);
  //const [series,setSeries] = useState([]);
  const series = [[total / 100],];
  
  const Get_data = async () => {
    const YM =  Date.format("YYYY-MM")
    const { data: { NewRecords } } = await axios.get('/api/GetBudgetInformation', {
        params: {
          username,
          YM,
        },
      });
      return NewRecords;
  }
  
  const types = async () => {
      let position = {};
      let tempTypes = new Set();
      let tempseries = [];
      let count = 0;
      const spent = await Get_data();
      for (let i = 0; i < spent.length; i++){
        count += spent[i].cost;
        // let Type = spent[i].type;
        // console.log(Type);
        // let cost = BudgetData[i].cost
        // if (!tempTypes.has(Type)){
        //     tempTypes.add(Type);
        //     position.Type = tempTypes.size - 1;
        //     tempseries.push(cost);
        // }
    }
    setTotal(count);
    console.log(total);
    //setBudgetData(Array.from(tempTypes));
  }

  useEffect(()=>{
      types();
    },[Date]);
  /*const HandleChange = async ()=>{
    setLabels([]);
    //setSeries([]);
    let position = {};
    let tempTypes = new Set();
    let tempseries = [];
    const BudgetData = await Get_data();
    //console.log(BudgetData);
    for(let i = 0;i < BudgetData.length;i++){   
        let Type = BudgetData[i].type
        let cost = BudgetData[i].cost
        if(!tempTypes.has(Type)){
            tempTypes.add(Type);
            position.Type = tempTypes.size - 1;
            tempseries.push(cost);
        }
        else{
            tempseries = tempseries.map((item,index)=>{
                if(index === position.Type) return item += cost
                else return item
            })
        }
    }
    setLabels(Array.from(tempTypes));
    setSeries([tempseries])
  }*/

  const changeValue = (e) => {
    setBud(e.target.value);
  }

  const APexChart = () => {
    
    return (
      <>
      
      </>
    )
  }

  return (
    <>
      <DatePicker 
        size="large" 
        defaultValue={Date} 
        picker="month" 
        onChange={(date)=>
          {setDate(date)}} 
        allowClear={false}
      />
      <Input 
      maxLength={25}
      placeholder="Input your budget for this month"
      onChange={changeValue}
      />
      <ReactApexChart 
        options={options} 
        series={series}
        type="radialBar" 
        height={300} 
        width={300}
      />
    </>
  )
};

export default Budget;
