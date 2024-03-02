import React from 'react';
import './App.css';
import CreateForm from "./component/form/CreateForm";
import EmployeeList from "./component/employee/EmployeeList";
import {Flex, Layout} from "antd";
import {Content, Header, Footer} from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";

const layoutStyle = {
    borderRadius: 8,
    overflow: 'hidden',
    width: 'calc(100% - 8px)',
    maxWidth: 'calc(100% - 8px)',
    padding: '20px',
};

const siderStyle: React.CSSProperties = {
    borderRadius: 8,
    textAlign: 'center',
    lineHeight: '120px',
    color: '#986f6f',
    backgroundColor: '#c3ccda',
    padding: '20px',
    margin: '5px'
};

const contentStyle: React.CSSProperties = {
    borderRadius: 8,
    textAlign: 'center',
    minHeight: 120,
    lineHeight: '120px',
    color: '#d5b8b8',
    backgroundColor: '#dadde5',
    padding: '20px',
    margin: '5px'
};



function App() {
    return (
        <>
            <Flex gap="middle" wrap="wrap">
                <Layout style={layoutStyle}>
                    <Sider width="25%" style={siderStyle}>
                        <CreateForm/>
                    </Sider>
                    <Layout>
                        <Content style={contentStyle}>
                            <EmployeeList/>
                        </Content>
                    </Layout>
                </Layout>
            </Flex>
        </>
    );
}

export default App;
