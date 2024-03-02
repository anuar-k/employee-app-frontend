const BACKEND_URL = 'http://localhost:8081'
const ALL_COUNTRY_URI = '/country/all'
const ALL_EMPLOYEE_URI = '/employee/all'
const CREATE_EMPLOYEE_URI = '/employee/add'
const GET_CITIES_BY_COUNTY_NAME_URI = '/city/countryName/'

export const getAllCountries = async () => {
    return await fetch(BACKEND_URL + ALL_COUNTRY_URI)
        .then(response => response.json())
        .then(data => data);
}

export const getCitiesByCountryName = async (countryName: string) => {
    return await fetch(BACKEND_URL + GET_CITIES_BY_COUNTY_NAME_URI + countryName)
        .then(response => response.json())
        .then(data => data);
}

export const getAllEmployee = async () => {
    return await fetch(BACKEND_URL + ALL_EMPLOYEE_URI)
        .then(response => response.json())
        .then(data => data);
}

export const createEmployee = (data: any) => {

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    fetch(BACKEND_URL + CREATE_EMPLOYEE_URI, options)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
}