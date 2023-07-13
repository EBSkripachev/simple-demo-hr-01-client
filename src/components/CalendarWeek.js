import React from 'react';
import CalendarDay from './CalendarDay';
import DatesUtils from '../utils/DatesUtils';
import { useDispatch } from 'react-redux';
import { selectWeek } from '../store/taskSlice';

const CalendarWeek = ({week, weekIndex, selected, selectedDate, selectDate}) => {
    
    const dispatch = useDispatch()
    const select = () => {
        dispatch(selectWeek(weekIndex))
    }

    
    
    return (
        <div
        className={selected ? 'row p-2 rounded bg-selected' : 'row p-2 rounded'}
        onClick={select}
        >
            {
                week.map((date, index) =>
                    <CalendarDay 
                    key={index} 
                    date={date} 
                    selectDate={selectDate}
                    selected={DatesUtils.compareDates(date, selectedDate)}
                    />
                )
            }
        </div>
    );
};

export default CalendarWeek;