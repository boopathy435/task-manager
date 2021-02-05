import { TasksResponse } from "../models/task.model";

export const tasksResponse: TasksResponse = {
    status: "success",
    tasks: [
        {
            message: 'Do something?',
            due_date: '2020-09-18 12:12:12',
            priority: 2,
            assigned_to: 1,
            taskid: 1
        },
        {
            message: 'Open the door',
            due_date: '2020-09-10 12:12:12',
            priority: 3,
            assigned_to: 5,
            taskid: 2
        },
        {
            message: 'Cook good food',
            due_date: '2020-09-15 12:12:12',
            priority: 1,
            assigned_to: 3,
            taskid: 3
        },
        {
            message: 'Complete the Mars Mission',
            due_date: '2020-09-20 12:12:12',
            priority: 3,
            assigned_to: 2,
            taskid: 4
        },
        {
            message: 'Close the Window',
            due_date: '2020-09-20 12:12:12',
            priority: 1,
            assigned_to: 3,
            taskid: 5
        },
        {
            message: 'Lift the jar',
            due_date: '2020-09-25 12:12:12',
            priority: 2,
            assigned_to: 1,
            taskid: 6
        },
        {
            message: 'Test the Angular Application',
            due_date: '2020-09-30 12:12:12',
            priority: 3,
            assigned_to: 2,
            taskid: 7
        },
    ]
};