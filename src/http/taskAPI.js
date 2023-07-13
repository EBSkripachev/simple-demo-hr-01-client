import { $host } from '.';


export const fetchTasksByTimeSheetId = async (timeSheeId) => {
    const {data} = await $host.get('/tasks', {params: {timeSheeId: timeSheeId}})
    return data
}

export const createTask = async (task) => {
    const {data} = await $host.post('/tasks', task)
    return data
}

export const updateTask = async (task) => {
    const {data} = await $host.put('/tasks', task)
    return data
}

export const deleteTask = async (id) => {
    const {data} = await $host.delete('/tasks/' + id)
    return data
}

export const fetchAllProjects = async () => {
    const {data} = await $host.get('/projects')
    return data
}

export const fetchAllProjectElements = async () => {
    const {data} = await $host.get('/projectElements')
    return data
}

export const fetchTimeSheetById = async (id) => {
    const {data} = await $host.get('/timeSheets/' + id)
    return data
}

