export interface Task {
    message: string,
    due_date: string,
    priority: number,
    assigned_to: number,
    taskid: number
}

export interface TasksResponse {
    status: string,
    tasks: Task[]
}