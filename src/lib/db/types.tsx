export type RecurrenceType =
    | 'daily'
    | 'interval'
    | 'weekly'
    | 'monthly'
    | 'specific'
    | 'none';

export type TaskStatusType =
    | 'pending'
    | 'in_progress'
    | 'done'
    | 'abandoned'
    | 'postponed';

export interface IProject {
    id: number;
    name: string;
    description: string | null;
    deadline: Date | null;
    created_at: Date;
    updated_at: Date;
}

export interface ITask {
    id: number;
    name: string;
    description?: string;
    deadline?: Date;
    status: TaskStatusType;
    project_id?: number;
    created_at: Date;
    updated_at: Date;
    start_on: Date;
    end_on?: Date;
    recurrence_type: RecurrenceType;
    recurrence_interval?: number;
    recurrence_weekdays?: number[];
    recurrence_day_of_month?: number;
}

export type CreateTaskInput = Omit<ITask, 'id' | 'created_at' | 'updated_at'>;

export interface IProjectStats {
    completion_percentage: number;
    task_counts: {
        pending: number;
        in_progress: number;
        done: number;
        abandoned: number;
        postponed: number;
    };
}
