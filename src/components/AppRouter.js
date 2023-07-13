import React, { Component } from 'react';
import Admin from "../pages/Admin";
import Users from "../pages/Users";
import { ADMIN_ROUTE, TASK_ROUTE, USERS_ROUTE } from "../utils/consts";
import { Route, Routes } from 'react-router-dom';
import TaskManager from '../pages/TaskManager';

function AppRouter() {
    return (
        <Routes>
            <Route path={ADMIN_ROUTE} Component={Admin}/>
            <Route path={USERS_ROUTE} Component={Users}/>
            <Route path={TASK_ROUTE} Component={TaskManager}/>
            <Route path='*' Component={TaskManager}/>
        </Routes>
    );
}

export default AppRouter;