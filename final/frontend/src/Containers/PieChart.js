import Chart from 'react-apexcharts'
import React from 'react';
import { Tabs, Button, Space, Input, Typography, message, DatePicker } from 'antd';
import moment from "moment";
import '../Css/PieGraph.css'
import axios from '../axios'
import { useState, useEffect } from 'react';
import RingLoader from 'react-spinners/RingLoader'
import { css } from "@emotion/react";
const { TabPane } = Tabs;
const { Search } = Input;
const { Title } = Typography;

const override = css`
  display: block;
  margin: -20%;
  border-color: #971d1d;
`;
const Graph = ({ username }) => {
    const [Date, setDate] = useState(moment())
    const [labels, setLabels] = useState([]);
    const [series, setSeries] = useState([]);
    const [status, setStatus] = useState("支出");
    const [loading2, setLoading2] = useState(false);
    const getdata = async () => {
        const YM = Date.format("YYYY-MM")
        const { data: { NewRecords } } = await axios.get('/api/GetPieInformation', { // get backend
            params: {
                username, // give backend
                YM,
                status
            },
        })
        //console.log(YM);
        return NewRecords;
    }
    const HandleChange = async () => {
        setLoading2((loading) => !loading)
        setLabels([]);
        setSeries([]);
        let position = {};
        let templabels = new Set();
        let tempseries = [];

        const NewRecords = await getdata();
        console.log(NewRecords)
        for (let i = 0; i < NewRecords.length; i++) {
            let Type = NewRecords[i].type
            let cost = NewRecords[i].cost
            if (!templabels.has(Type)) {
                templabels.add(Type);
                position.Type = templabels.size - 1;
                tempseries.push(cost);
            }
            else {
                tempseries = tempseries.map((item, index) => {
                    if (index === position.Type) return item += cost
                    else return item
                })
            }
        }
        setLabels(Array.from(templabels));
        setSeries(tempseries)
        setLoading2((loading) => !loading)
    }
    useEffect(() => {
        HandleChange();
        //console.log(loading2);
    }, [status, Date])
    var options = {
        chart: {
            animation: {
                enabled: true,
                speed: 100,
                animateGradually: {
                    enabled: true,
                    delay: 500
                },
            }
        },
        noData: {
            text: " There is no record in this Month",
            align: 'center',
            verticalAlign: 'middle',
            offsetX: 0,
            offsetY: -200,
            style: {
                color: "red",
                fontSize: '30px',
                fontFamily: "sans-serif"
            }
        },
        legend: {
            position: 'bottom',
            fontSize: "20%"
        },
        labels: labels
    };

    return loading2 ? (
        <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
            <RingLoader color="#971d1d" css={override} size={100} />
        </div>) : (
        <Tabs defaultActiveKey={status} centered onTabClick={(key) => setStatus(key)}>
            <TabPane tab="支出" key="支出">
                <DatePicker size="large" value={Date} picker="month" onChange={(date) => { setDate(date) }} allowClear={false} />
                <div className='pie'>
                    {/*<Button  type='primary' onClick={()=>{HandleChange()}}> 確認 </Button>*/}
                    <Chart options={options} type="pie" series={series} width="500" height='1000' />
                </div>
            </TabPane>
            <TabPane tab="收入" key="收入">
                <DatePicker size="large" value={Date} picker="month" onChange={(date) => { setDate(date) }} allowClear={false} />
                <div className='pie'>
                    {/*<Button  type='primary' onClick={()=>{HandleChange()}}> 確認 </Button>*/}
                    <Chart options={options} type='pie' series={series} width="500" height='1000' />
                </div>
            </TabPane>
        </Tabs>
    )
}
export default Graph