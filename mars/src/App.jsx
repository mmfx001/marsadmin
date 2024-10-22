import React  from 'react';
import { Route, Routes } from 'react-router-dom';

import Admin from './admin';
import AdminPanel from './page/shopedith';
import AdminForcheck from './page/AdminForcheck'
import UsersEdit from './page/usersedith';
import TeachersEdit from './page/teacher';
import Adminn from './page/AdminRaiting';
import UserDetail from './page/userDetail';

function App() {
    return (
        <div>
            {/* Routes Setup */}<Admin/>
    <div className='mt-24'>
    <Routes>
                <Route path='/' element={<UsersEdit />} />
                <Route path='/shop' element={<AdminPanel />} />
                <Route path='/adminr' element={<Adminn />} />
                <Route path='/detail' element={<UserDetail />} />
                <Route path='/teacher' element={<TeachersEdit />} />
                <Route path='/admin' element={<AdminForcheck />} />
                <Route path="*" element={"note data"} /> {/* 404 sahifasi */}
            </Routes>
    </div>
        </div>
    );
}



export default App;
