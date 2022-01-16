import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Tabs, Button, Space, Input, Typography, message, DatePicker, Modal } from 'antd';
import '../Css/Add.css';
import axios from '../axios.js'
import moment from "moment";

const { TabPane } = Tabs;
const { Search } = Input;
const { Title } = Typography;


const Add = ({ username }) => {
    const [Textfield, setTextfield] = useState(0);
    const [Content, setContent] = useState('');
    const [Type, setType] = useState("");
    const [AddType, setAddtype] = useState("");
    const [Status, setStatus] = useState("支出");
    const [Date, setDate] = useState(moment());
    const [address,setAddress] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    let navigate = useNavigate();

    // console.log(Date);
    const handleTab = (key) => {
        setTextfield(0);
        setStatus(key);
    }

    const handleCost = async (cost) => {
        const date_Y = Date.format('YYYY');
        const date_YM = Date.format('YYYY-MM');
        const date = Date.format('YYYY-MM-DD');
        var r = /^[0-9]*[1-9][0-9]*$/;
        if (cost === "") {
            message.error({
                content: "Please enter the number"
            })
        }
        else if (r.test(cost)) {
            console.log({
                username: username,
                date_Y: date_Y,
                date_YM: date_YM,
                date: date,
                record: {
                    status: Status,
                    type: Type,
                    content: Content,
                    cost: cost,
                    address
                }
            })
            const {
                data: { Message },
            } = await axios.post('/api/AddRecord', {
                username: username,
                date_Y: date_Y,
                date_YM: date_YM,
                date: date,
                record: {
                    status: Status,
                    type: Type,
                    content: Content,
                    cost: cost,
                    address
                }
            });
            message.success({
                content: Message
            })
            navigate("/calendar");
        }
        else {
            message.error({
                content: "Please enter the number"
            })
        }
    }
    const handleTextfield = (event) => {
        setTextfield(1);
        // console.log(event.target.innerText);
        setType(event.target.innerText);
    }
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        if (AddType !== "") {
            setTextfield(1);
            setIsModalVisible(false);
            setType(AddType);
            message.success({
                content: 'Add success'
            })
        }
        else {
            message.error({
                content: 'Input value is empty'
            })
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const outcome = ["飲食", "交通", "日常用品", "服飾", "電話網路", "水電瓦斯", "娛樂", "教育", "保險", "稅金"]
    const income = ["工資", "獎金", "股票", "彩券"]

    return (
        <Tabs defaultActiveKey="支出" centered onTabClick={(key) => handleTab(key)}>
            <TabPane tab="支出" key="支出">
                <Space size={[20, 20]} wrap align='center'>
                    {new Array(10).fill(null).map((_, index) => (
                        <Button shape='round' key={index} style={{ height: '75px', width: '75px', padding: '4px 4px' }}
                            onClick={(event) => handleTextfield(event)}
                        >{outcome[index]}
                        </Button>
                    ))}
                    <Button shape='round' key={'NEW'} style={{ height: '75px', width: '75px', padding: '4px 4px', fontSize: '25px' }}
                        onClick={showModal}
                    >+
                    </Button>
                    <Modal title="新增項目" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                        <Input
                            value={AddType}
                            size='large'
                            placeholder="請輸入新項目"
                            onChange={(e) => { setAddtype(e.target.value) }}
                        />
                    </Modal>
                </Space>
                <div style={{ margin: "5%" }}>
                    {Textfield ? (<>
                        <Title level={2}><DatePicker size='large' defaultValue={Date} onChange={(date) => setDate(date)} allowClear={false} /></Title>
                        <Title level={2}>{Date.format('YYYY-MM-DD')}</Title>
                        <Title level={2} style={{ marginBottom: '10px' }}>{Type}</Title>
                        <Input placeholder="備註"
                            allowClear
                            size="large"
                            style={{ width: '60%', marginTop: '20px' }}
                            value={Content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                        <Title level={2}>
                            <Input placeholder="地址"
                            allowClear
                            size="large"
                            style={{ width: '60%', marginTop: '20px' }}
                            value={address}
                            onChange={(e) =>setAddress(e.target.value)}
                            /> </Title>
                        <Search
                            placeholder="請輸入金額"
                            allowClear
                            enterButton="確認"
                            size="large"
                            style={{ width: '50%', marginTop: '20px' }}
                            onSearch={handleCost}
                        />
                    </>) : (<></>)
                    }
                </div>
            </TabPane>
            <TabPane tab="收入" key="收入">
                <Space size={[20, 20]} wrap align='center'>
                    {new Array(4).fill(null).map((_, index) => (
                        <Button shape='round' key={index} style={{ height: '75px', width: '75px', padding: '4px 4px' }}
                            onClick={(event) => handleTextfield(event)}
                        >{income[index]}
                        </Button>
                    ))}
                    <Button shape='round' key={"NEW"} style={{ height: '75px', width: '75px', padding: '4px 4px', fontSize: '25px' }}
                        onClick={showModal}
                    >+
                    </Button>
                    <Modal title="新增項目" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                        <Input
                            value={AddType}
                            size='large'
                            placeholder="請輸入新項目"
                            onChange={(e) => { setAddtype(e.target.value) }}
                        />
                    </Modal>
                </Space>
                <div style={{ margin: "5%" }}>
                    {Textfield ? (<>
                        <Title level={2}><DatePicker size='large' defaultValue={Date} onChange={(date) => setDate(date)} allowClear={false} /></Title>
                        <Title level={2}>{Date.format('YYYY-MM-DD')}</Title>
                        <Title level={2}>{Type}</Title>
                        <Input placeholder="備註"
                            allowClear
                            size="large"
                            style={{ width: '60%', marginTop: '20px' }}
                            value={Content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                        <Search
                            placeholder="請輸入金額"
                            allowClear
                            enterButton="確認"
                            size="large"
                            style={{ width: '50%', marginTop: '20px' }}
                            onSearch={handleCost}
                        />
                    </>) : (<></>)
                    }
                </div>
            </TabPane>
        </Tabs>
    )
};

export default Add;