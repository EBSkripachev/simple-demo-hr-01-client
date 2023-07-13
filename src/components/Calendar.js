import React, { useState } from 'react';
import CalendarWeek from './CalendarWeek';
import { WEEK_HEADER } from '../utils/consts';
import { useSelector } from 'react-redux';

const Calendar = () => {

    const monthMap = useSelector(state => state.tasks.monthMap)
    const weekIndex = useSelector(state => state.tasks.weekIndex)

    return (
        <div className='text-center  p-3' style={{width: "400px"}}>
            <div className='row'>
                {
                    WEEK_HEADER.map((day, index) =>
                        <div key={index} className='col p-1'>
                            <small>{day}</small>
                        </div>
                    )
                }
            </div>
            <div>
                {
                    monthMap.map((week, index) => 
                        <CalendarWeek 
                        key={index} 
                        weekIndex={index}
                        week={week} 
                        selected={index === weekIndex ? true : false}
                        />
                    )
                }
            </div>
        </div>
    );
};

export default Calendar;