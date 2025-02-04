export type RecurrenceType =
    | 'daily'
    | 'interval'
    | 'weekly'
    | 'monthly'
    | 'specific'
    | 'none';

export type TaskStatus =
    | 'pending'
    | 'in_progress'
    | 'done'
    | 'abandoned'
    | 'postponed';

export interface Project {
    id: number;
    name: string;
    description: string | null;
    deadline: Date | null;
    created_at: Date;
    updated_at: Date;
}

export interface Task {
    id: number;
    name: string;
    description?: string | null;
    deadline?: Date | null;
    status: TaskStatus;
    project_id?: number | null;
    created_at: Date;
    updated_at: Date;
    start_on: Date;
    end_on?: Date | null;
    recurrence_type: RecurrenceType;
    recurrence_interval?: number | null;
    recurrence_weekdays?: number[] | null;
    recurrence_day_of_month?: number | null;
}

export type CreateTaskInput = Omit<Task, 'id' | 'created_at' | 'updated_at'>;

export interface ProjectStats {
    completion_percentage: number;
    task_counts: {
        pending: number;
        in_progress: number;
        done: number;
        abandoned: number;
        postponed: number;
    };
}
