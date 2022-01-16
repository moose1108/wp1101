import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Tabs, Button, Space, Input, Typography, message, DatePicker, Modal } from 'antd';
import axios from '../axios.js'
import moment from "moment";

const { Title, Text } = Typography;

const Property = ({ username }) => {

    const [TotalIncome, setTotalIncome] = useState(0);
    const [TotalOutcome, setTotalOutcome] = useState(0);
    const [TotalMonth, setTotalMonth] = useState(0);
    const [Record, setRecord] = useState([]);
    const Date = moment();
    const date = Date.format('YYYY-MM');

    const getData = async () => {
        const { data: { records } } = await axios.get('/api/GetUserInformation', { // get backend
            params: {
                username, // give backend
            },
        });
        setRecord(records);
    }
    const handleCalculate = () => {
        let tempIncome = 0;
        let tempOutcome = 0;
        let tempMonth = 0;
        for (let i = 0; i < Record.length; i++) {
            let Status = Record[i].status;
            let cost = Record[i].cost;
            if (Status === "支出") {
                tempOutcome += cost;
                if (Record[i].date_YM === date)
                    tempMonth -= cost;
            }
            else if (Status === "收入") {
                tempIncome += cost;
                if (Record[i].date_YM === date)
                    tempMonth += cost;
            }
        }
        setTotalIncome(tempIncome);
        setTotalOutcome(tempOutcome);
        setTotalMonth(tempMonth);
    }
    const handleColor = (cost) => {
        if (cost < 0)
            return "danger";
        else if (cost > 0)
            return "success";
    }
    useEffect(() => {
        getData();
    }, [])
    console.log(Record);

    useEffect(() => {
        handleCalculate();
    }, [Record])
    return (
        <>
            <div style={{ marginTop: '15%' }}></div>
            <Title level={2} type={handleColor(TotalIncome - TotalOutcome)}>${TotalIncome - TotalOutcome}</Title>
            <Title level={2} style={{ marginTop: "1%", marginBottom: "5%" }}>淨資產</Title>
            <Space size={[100, 20]} wrap align='center'>
                <div>
                    <div>
                        <Title level={2} type='danger'>-${TotalOutcome}</Title>
                    </div>
                    <Title level={2}>總支出</Title>
                </div>
                <div>
                    <div>
                        <Title level={2} type='success'>${TotalIncome}</Title>
                    </div>
                    <Title level={2}>總收入</Title>
                </div>
                <div>
                    <div>
                        <Title level={2} type={handleColor(TotalMonth)}>${TotalMonth}</Title>
                    </div>
                    <Title level={2}>本月收支</Title>
                </div>
            </Space>
        </>
    )
}

export default Property;