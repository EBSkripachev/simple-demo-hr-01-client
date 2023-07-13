import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Button, Form, FormControl, FormGroup, FormLabel, FormSelect } from 'react-bootstrap';
import { DATE_INVALID_FEEDBACK, HOURS_INVALID_FEEDBACK, PROJECT_ELEMENT_INVALID_FEEDBACK, PROJECT_INVALID_FEEDBACK } from '../utils/consts';
import DatesUtils from '../utils/DatesUtils';
import { fetchAllProjectElements, fetchAllProjects } from '../http/taskAPI';
import { useDispatch, useSelector } from 'react-redux';
import { createTaskThunk, selectDate } from '../store/taskSlice';

const TaskForm = () => {

    const dispatch = useDispatch()

    const date = useSelector(state => { 
        if (state.tasks.date !== null) {
            return new Date(state.tasks.date)
        } 
    } )

    const year = useSelector(state => state.tasks.year)
    const month = useSelector(state => state.tasks.month)
    const [task, setTask] = useState({timeSheetId: '2', projectId: '', projectElementId: '', title: '', description: '', date: date, hours: '0.0'})

    const [projects, setProjects] = useState([])
    const [elements, setElements] = useState([])

    const [errors, setErrors] = useState({})




    const validate = () => {
        const { date, projectId, projectElementId, hours } = task
        const newErrors = {}

        if (!date) {
            newErrors.date = true
        } else if (date.getFullYear() !== year || date.getMonth() !== month) {
            newErrors.date = true
        }

        if (!projectId || projectId === '') {
            newErrors.projectId = true
        }

        if (!projectElementId || projectElementId === '') {
            newErrors.projectElementId = true
        }

        if (!hours || hours === 0 || hours === '0.0') {
            newErrors.hours = true
        }

        return newErrors
    }

    const dateRef = useRef()


    useEffect(() => {
        fetchAllProjects().then(data => setProjects(data)).catch(e => console.log(e.message))
        fetchAllProjectElements().then(data => setElements(data)).catch(e => console.log(e.message))
    }, [])


    const handleChangeDate = (e) => {
        if (errors.date) {
            setErrors({...errors, date: false})
        }
        setTask({...task, date: new Date(e.target.value)})
        dispatch(selectDate(new Date(e.target.value)))
    }


    const handleChangeHours = (e) => {
        if (errors.hours) {
            setErrors({...errors, hours: false})
        }
        setTask({...task, hours: parseFloat(e.target.value).toFixed(1)})
    }

    const handleChangeProjectElementId = (e) => {
        if (errors.projectElementId) {
            setErrors({...errors, projectElementId: false})
        }

        setTask({...task, projectElementId: parseInt(e.target.value)})
    }

    const handleChangeProjectId = (e) => {
        if (errors.projectId) {
            setErrors({...errors, projectId: false})
        }
        setTask({...task, projectId: parseInt(e.target.value)})
    }

    const handleSave = () => {
        const newErrors = validate(task)
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
        } else {
            dispatch(createTaskThunk({...task, date: DatesUtils.toString(task.date)}))
        }
    }

    const filteredElements = useMemo(() => {
        return elements.filter(element => element.projectId === task.projectId)
    }, [task.projectId, elements])

    const handleClear = () => {
        setTask({...task, date: null, title: '', projectId: '', projectElementId: '', description: '', hours: '0.0'})
        dispatch(selectDate(null))
        setErrors({})
    }


    return (
        <Form className='p-3' style={{maxWidth: '600px', minWidth: '320px'}}>
            <FormGroup>
                <FormLabel>Дата</FormLabel>
                <FormControl 
                type='date' 
                isInvalid={errors.date}
                onChange={handleChangeDate}
                value={DatesUtils.toString(date)}
                ref={dateRef}
                />
                <Form.Control.Feedback type="invalid">{DATE_INVALID_FEEDBACK}</Form.Control.Feedback>
            </FormGroup>
            <FormGroup>
                <FormLabel>Проект</FormLabel>
                <FormSelect 
                value={task.projectId} 
                onChange={(e) => handleChangeProjectId(e)}
                isInvalid={errors.projectId}
                >
                    <option value=''></option>
                    {projects.map((project) => 
                        <option key={project.id} value={project.id}>{project.title}</option>
                    )}
                </FormSelect>
                <Form.Control.Feedback type="invalid">{PROJECT_INVALID_FEEDBACK}</Form.Control.Feedback>
            </FormGroup>
            <div className='d-flex'>
                <FormGroup className='w-50 pe-2'>
                    <FormLabel>Задача</FormLabel>
                    <FormSelect 
                    value={task.projectElementId} 
                    onChange={(e) => handleChangeProjectElementId(e)}
                    isInvalid={errors.projectElementId}
                    >
                        <option value=''></option>

                        {filteredElements.map(element => 
                            <option key={element.id} value={element.id}>{element.title}</option>
                        )}

                    </FormSelect>
                    <Form.Control.Feedback type="invalid">{PROJECT_ELEMENT_INVALID_FEEDBACK}</Form.Control.Feedback>
                </FormGroup>
                <FormGroup className='w-50 ps-2'>
                    <FormLabel>Количество часов</FormLabel>
                    <FormControl 
                    type='number'
                    step='0.5'
                    min='0'
                    onChange={(e) => handleChangeHours(e)}
                    value={task.hours}
                    isInvalid={errors.hours}
                    />
                    <Form.Control.Feedback type="invalid">{HOURS_INVALID_FEEDBACK}</Form.Control.Feedback>
                </FormGroup>
            </div>
            <FormGroup>
                <FormLabel>Описание</FormLabel>
                <FormControl 
                as='textarea' 
                rows={3}
                style={{resize: 'none'}}
                onChange={(e) => setTask({...task, description: e.target.value})}
                value={task.description}
                />
            </FormGroup>

            <Button variant="success" className='mt-3' onClick={handleSave}>
                Сохранить
            </Button>
            <Button variant="secondary" className='mt-3 ms-2' onClick={handleClear}>
                Очистить
            </Button>
        </Form>
    );
};

export default TaskForm;