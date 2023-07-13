import { Button, ListGroup } from 'react-bootstrap';
import Task from './Task';
import { useDispatch, useSelector } from 'react-redux';
import DatesUtils from '../utils/DatesUtils';
import { selectDate } from '../store/taskSlice';

const TaskDay = ({ date }) => {
    
    const dispatch = useDispatch()
    const tasks = useSelector(state => state.tasks.tasks.filter(task => DatesUtils.compareDates(date, task.date))
                                                         .map(task => {return {...task, date: new Date(task.date) }})
                                                         .sort((a,b) => a.id > b.id ? 1 : -1))

    const handleClick = () => {
        dispatch(selectDate(date))
    }


    return (
        <div className='' >
            <div className='ps-1 d-flex mb-3'>
                <h4 className='me-auto pe-2'>{date ? date.getDate() + ' ' + date.toLocaleDateString('ru-RU', { weekday: 'short' }) : ''}</h4>
                <Button 
                variant='outline-secondary'
                className='border-0'
                disabled={!date}
                onClick={(e) => handleClick()}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                    </svg>
                </Button>
            </div>
            <ListGroup> 
                {
                    tasks.map((task, index) => 
                        <Task key={index} task={task} />
                    )
                }
            </ListGroup>

        </div>
    );
};  

export default TaskDay;