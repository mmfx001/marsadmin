import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import Admin from './admin';

import UsersEdit from './page/usersedith';


function App() {
    return (
        <div>
            {/* Routes Setup */}<Admin/>
            <Routes>
                <Route path='/' element={<UsersEdit />} />
             
                <Route path="*" element={"note data"} /> {/* 404 sahifasi */}
            </Routes>
        </div>
    );
}



export default App;
