import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import Admin from './admin';
import AdminForcheck from './page/AdminForcheck'
import TeachersEdit from './page/teacher';


function App() {
    return (
        <div>
            {/* Routes Setup */}<Admin/>
            <Routes>
          
                <Route path='/teacher' element={<TeachersEdit />} />
                <Route path='/admin' element={<AdminForcheck />} />
                <Route path="*" element={"note data"} /> {/* 404 sahifasi */}
            </Routes>
        </div>
    );
}



export default App;
