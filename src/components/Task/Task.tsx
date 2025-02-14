import { ITask } from '@/lib/db/types';
import styles from './Task.module.css';

interface Props {
    taskData: ITask;
}

export default function Task({ taskData }: Props) {
    return (
        <div className={styles.task}>
            <h4> {taskData.name} </h4>
            <div>{taskData.status}</div>
        </div>
    );
}
