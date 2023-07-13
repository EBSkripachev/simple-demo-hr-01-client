import React, { useEffect } from 'react';
import TaskDay from './TaskDay';
import DatesUtils from '../utils/DatesUtils';
import { useSelector } from 'react-redux';

const TaskWeek = () => {
    
    const week = useSelector(state => state.tasks.week)

    return (
        <div className='d-flex flex-nowrap' style={{minHeight: "500px"}}>
            {
                week.map((date, index) => 
                    <div key={index} className='flex-fill p-1 border-end border-top' style={{minWidth: "140px", maxWidth: "250px"}}>
                        <TaskDay date={date} />
                    </div>
                )
            }
        </div>
    );
};

export default TaskWeek;