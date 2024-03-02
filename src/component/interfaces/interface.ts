import * as React from "react";

export interface EmployeeType {
    id: React.Key;
    firstName: string;
    lastName: string;
    middleName: string;
    country: string;
    city: string;
    number: number;
}

export interface CountryType {
    id: number;
    name: string;
}

export interface CityType {
    id: number;
    name: string;
}