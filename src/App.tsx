import React from 'react';
import './App.css';
import CreateForm from "./component/form/CreateForm";
import EmployeeList from "./component/employee/EmployeeList";

function App() {
    return (
        <div>
            <CreateForm/>
            <EmployeeList/>
        </div>
    );
}

export default App;
