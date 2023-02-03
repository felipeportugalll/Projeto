import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';

//Imports Admin
import Dashboard from './pages/admin/dashboard';

import Courses from './pages/admin/courses';
import EditCourses from './pages/admin/courses/editCourses';
import RegisterCourses from './pages/admin/courses/registerCourses';

import Users from './pages/admin/users';
import EditUsers from './pages/admin/users/editUsers';
import RegisterUsers from './pages/admin/users/registerUsers';

//Imports Client
import Home from './pages/client/home';
import CoursesDetails from './pages/client/show-courses/coursesDetails';

//Function para as rotas
export default function RouteClient(){
    return(
        <BrowserRouter>            
            <Routes>
                {/*Rota Cliente*/}    
                <Route path="/" exact element={<Home/>} />
                <Route path="/show-courses/:idCourse" exact element={<CoursesDetails/>} />

                {/*Rota Admin*/}
                <Route path="/admin" exact element={<Dashboard/>} />

                <Route path="/admin/courses" exact element={<Courses/>} />
                <Route path="/admin/courses/editCourses/:idCourse" exact element={<EditCourses/>} />
                <Route path="/admin/courses/registerCourses" exact element={<RegisterCourses/>} />

                <Route path="/admin/users" exact element={<Users/>} />
                <Route path="/admin/users/editUsers/:idUser" exact element={<EditUsers/>} />
                <Route path="/admin/users/registerUsers" exact element={<RegisterUsers/>} />
            </Routes>
        </BrowserRouter>
    )
}
