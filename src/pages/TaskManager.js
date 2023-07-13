import React, { useEffect } from 'react';
import { useState } from 'react';
import Calendar from '../components/Calendar';
import TaskWeek from '../components/TaskWeek';
import TaskForm from '../components/TaskForm';
import index from '../css/index.css';
import { useDispatch } from 'react-redux';
import { createMonthMap, fetchTasksThunk, setPeriod } from '../store/taskSlice';

const TaskManager = () => {

    const dispatch = useDispatch()

    const [year, setYear] = useState(2023)
    const [month, setMonth] = useState(5)

    useEffect(() => {
        dispatch(createMonthMap({year: year, month: month}))
        dispatch(fetchTasksThunk(2))
        dispatch(setPeriod({year, month}))
    }, [])




    return (
        <div className='container-fluid p-2'>
            <div className='d-flex'>
                <div className='border-end'>
                    <Calendar/>
                </div>
                <div className='flex-fill'>
                    <TaskForm/>
                </div>
            </div>
            <div className='pt-2'>
                <TaskWeek/>
            </div>
        </div>
    );
};

export default TaskManager;