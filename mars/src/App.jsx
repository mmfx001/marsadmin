import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import Admin from './admin';
import UsersEdit from './page/usersedith';
import AdminPanel from './page/shopedith';
import AdminForcheck from './page/AdminForcheck'

function App() {
    return (
        <div>
            {/* Admin Component */}
            <Admin />

            {/* Routes Setup */}
            <Routes>
                <Route path='/usersedith' element={<UsersEdit />} />
                <Route path='/shop' element={<AdminPanel />} />
                <Route path='/admin' element={<AdminForcheck/>}/>
        </Routes>
        </div>
    );
}


export default App;
