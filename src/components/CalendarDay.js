import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { selectDate, selectWeek } from '../store/taskSlice';

const CalendarDay = ({date, selected}) => {
    const dispatch = useDispatch()
    const [hover, setHover] = useState(false)

    const handleClick = () => {
        dispatch(selectDate(date))
    }

    return (
        <div 
        className={'col p-1' + ((hover && date) || selected ? ' bg-selected-hover rounded' : '')} 
        style={{height: '53.43px', width: '55px'}}>
            <Button 
            variant=''
            className='border-0 w-100 h-100 p-0'
            onMouseEnter={(e) => setHover(true)}
            onMouseLeave={(e) => setHover(false)}
            onClick={(e) => handleClick()}
            >
                {!date ? ' ' : date.getDate()}
            </Button>
        </div>
    );
};

export default CalendarDay;