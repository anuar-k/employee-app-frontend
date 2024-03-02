import React, {useEffect, useRef, useState} from 'react';
import {Alert, Button, Form, Input, Select, Space} from 'antd';
import {createEmployee, getAllCountries, getCitiesByCountryName} from "../api/api";
import {CityType, CountryType} from "../interfaces/interface";

const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
};

const validateMessages = {
    required: 'заполните ${label}',
    types: {
        email: 'заполните ${label}'
    },
};


const CreateForm: React.FC = () => {
    const [form] = Form.useForm();
    const [countries, setCountries] = useState<CountryType[]>([]);
    const [cities, setCities] = useState<CityType[]>([]);
    const [selectedCountry, setSelectedCountry] = useState("dada")
    const [selectedCity, setSelectedCity] = useState("")
    const [errors, setErrors] = useState([])

    const onFinish = (values: any) => {
        let result = createEmployee(values["user"]);
        result.then(result => {
            if (result.errors) {
                setErrors(result.errors)
            } else {
                form.resetFields();
            }
        })
    };

    useEffect(() => {
        getAllCountries().then(countries => {
            setCountries(countries)
        })
    }, []);

    const onCountySelected = (countryName: string) => {
        handleResetSelect()

        getCitiesByCountryName(countryName).then(cities => {
            setCities(cities)
        })
    }

    useEffect(() => {
        setSelectedCity("")
        setCities([])
    }, [selectedCountry]);


    const handleResetSelect = () => {
        setSelectedCity("")
    };
    return (

        <Form
            form={form}
            {...layout}
            name="nest-messages"
            onFinish={onFinish}
            style={{maxWidth: 600}}
            validateMessages={validateMessages}
        >
            <Form.Item name={['user', 'firstName']} label="Имя" rules={[{required: true}]}>
                <Input/>
            </Form.Item>
            <Form.Item name={['user', 'lastName']} label="Фамилия" rules={[{required: true}]}>
                <Input/>
            </Form.Item>
            <Form.Item name={['user', 'middleName']} label="Очество" rules={[{required: true}]}>
                <Input/>
            </Form.Item>
            <Form.Item name={['user', 'country']} label="Страна">
                <Select defaultValue="Выберите страну" onSelect={onCountySelected}>
                    {countries.map(country => <Select.Option value={country.name}>{country.name}</Select.Option>)}
                </Select>
            </Form.Item>
            <Form.Item name={['user', 'city']} label="Город">
                <Select value={selectedCity} onChange={setSelectedCity} defaultValue="Выберите город">
                    {cities.map(city => <Select.Option value={city.name}>{city.name}</Select.Option>)}
                </Select>
            </Form.Item>
            <Form.Item name={['user', 'email']} label="Email"
                       rules={[{type: "email"},
                           {
                               required: true
                           }]}>
                <Input/>
            </Form.Item>
            <Form.Item name={['user', 'number']} label="Телефон"
                       rules={[
                           {
                               required: true,
                               message: "заполните номер"
                           },
                           {
                               type: "regexp",
                               pattern: new RegExp("/^[\\\\+]?[(]?[0-9]{3}[)]?[-\\\\s\\\\.]?[0-9]{3}[-\\\\s\\\\.]?[0-9]{4,6}$/im"),
                               message: "заполните номер правильно"
                           },
                       ]}
            >
                <Input/>
            </Form.Item>
            <Form.Item wrapperCol={{...layout.wrapperCol, offset: 8}}>
                <Button type="primary" htmlType="submit">
                    Добавить
                </Button>
            </Form.Item>

            {errors && errors.map(error =>
                <Space direction="vertical" style={{ width: '100%' }}>
                    <Alert message={'Валидация на стороне backend: ' + error} type="error" showIcon />
                </Space>

            )}
        </Form>
    );
}

export default CreateForm;