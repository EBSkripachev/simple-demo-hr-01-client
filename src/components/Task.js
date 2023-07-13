import React, { useRef, useState } from 'react';
import { Button, Form, FormControl, FormGroup, FormLabel, ListGroupItem, Overlay, Popover, PopoverBody, PopoverHeader } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { deleteTaskThunk, updateTaskThunk } from '../store/taskSlice';

const Task = ({task}) => {

    const dispatch = useDispatch()
    const [show, setShow] = useState(false)
    const [popover, setPopover] = useState(task)
    const [hover, setHover] = useState(false)
    const ref = useRef(null); 

    const handleShow = () => {
        setPopover({...popover, title: task.title, description: task.description, hours: task.hours})
        setShow(!show)
    }

    const handleSave = () => {
        dispatch(updateTaskThunk(popover))
        setShow(!show)
    }

    const handleDelete = (id) => {
        dispatch(deleteTaskThunk(id))
        setShow(!show)
    }

    const minHeight = 6
    const calcHeight = (hours) => {
        return hours * 10 * minHeight
    }


    return (
        <ListGroupItem 
        ref={ref} 
        className={'mb-1 rounded border bg-selected d-flex p-1' + (hover ? ' bg-selected-hover' : '')}
        style={{minHeight: minHeight + 'px', height: calcHeight(task.hours) + 'px'}}
        onMouseEnter={(e) => setHover(true)}
        onMouseLeave={(e) => setHover(false)}
        >
            <div 
            onClick={handleShow}
            className='flex-grow-1'>
                <h6 className='text-truncate mb-1' style={{width: '150px'}}>{task.title}</h6>
                <div className='text-truncate' style={{width: '150px', visibility: task.hours < 1 ? 'hidden' : 'visible'}}>{task.description}</div>
            </div>
            <h6 className='me-2'>{task.hours}</h6>
            <Overlay
            placement={task.date.getDay() < 4 && task.date.getDay() !== 0 ? 'right' : 'left'}
            container={ref}
            show={show}
            target={ref}
            rootClose
            onHide={() => setShow(false)}
            >
                <Popover style={{minWidth: '400px'}}>
                    <PopoverHeader>Редактировать</PopoverHeader>
                    <PopoverBody>
                        <Form>
                            <FormGroup>
                                <FormLabel>Задача</FormLabel>
                                <FormControl 
                                type='text' 
                                value={popover.title}
                                onChange={(e) => setPopover({...popover, title: e.target.value})}
                                >
                                </FormControl>
                            </FormGroup>
                            <FormGroup>
                                <FormLabel>Описание</FormLabel>
                                <FormControl 
                                type='text' 
                                value={popover.description}
                                onChange={(e) => setPopover({...popover, description: e.target.value})}
                                >
                                </FormControl>
                            </FormGroup>
                            <FormGroup>
                                <FormLabel>Количество часов</FormLabel>
                                <FormControl 
                                type='number' 
                                value={popover.hours}
                                step='0.5'
                                min='0'
                                onChange={(e) => setPopover({...popover, hours: parseFloat(e.target.value).toFixed(1)})}
                                >
                                </FormControl>
                            </FormGroup>
                        </Form>
                    </PopoverBody>
                    <div className='d-flex'>
                        <Button variant='success' className='ms-3 mb-2' onClick={() => handleSave()}>Сохранить</Button>
                        <Button variant='danger' className='ms-2 mb-2' onClick={() => handleDelete(task.id)}>Удалить</Button>
                    </div>
                </Popover>
            </Overlay>
        </ListGroupItem>
    );
};

export default Task;