import React, { useState } from 'react';
import { Plus, Trash2, Edit2 } from 'lucide-react';
import styles from './WeeklyScheduler.module.css';

export default function WeeklyScheduler() {
    const daysOfWeek = [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
    ];
    const defaultHours = Array.from(
        { length: 24 },
        (_, i) => `${String(i).padStart(2, '0')}:00`,
    );

    const [timeSlots, setTimeSlots] = useState(defaultHours);
    const [newTime, setNewTime] = useState('');
    const [schedule, setSchedule] = useState({});
    const [editMode, setEditMode] = useState(false);

    const addTimeSlot = () => {
        if (!newTime) return;

        // Convert input to standardized format
        const [hours, minutes] = newTime.split(':').map(num => parseInt(num));
        const formattedTime = `${String(hours).padStart(2, '0')}:${String(
            minutes,
        ).padStart(2, '0')}`;

        if (!timeSlots.includes(formattedTime)) {
            const newTimeSlots = [...timeSlots, formattedTime].sort((a, b) => {
                const [aHours, aMinutes] = a
                    .split(':')
                    .map(num => parseInt(num));
                const [bHours, bMinutes] = b
                    .split(':')
                    .map(num => parseInt(num));
                return aHours * 60 + aMinutes - (bHours * 60 + bMinutes);
            });
            setTimeSlots(newTimeSlots);
            setNewTime('');
        }
    };

    const removeTimeSlot = time => {
        setTimeSlots(timeSlots.filter(t => t !== time));
        // Clean up any scheduled items for this time
        const newSchedule = { ...schedule };
        Object.keys(newSchedule).forEach(day => {
            delete newSchedule[day][time];
        });
        setSchedule(newSchedule);
    };

    const toggleScheduleItem = (day, time) => {
        setSchedule(prev => {
            const newSchedule = { ...prev };
            if (!newSchedule[day]) {
                newSchedule[day] = {};
            }
            if (newSchedule[day][time]) {
                delete newSchedule[day][time];
            } else {
                newSchedule[day][time] = true;
            }
            return newSchedule;
        });
    };

    return (
        <div className={styles.container}>
            <div className={styles.controls}>
                <input
                    type="time"
                    value={newTime}
                    onChange={e => setNewTime(e.target.value)}
                    className={styles.timeInput}
                />
                <button
                    onClick={addTimeSlot}
                    className={styles.addButton}
                >
                    <Plus size={16} /> Add Time
                </button>
                <button
                    onClick={() => setEditMode(!editMode)}
                    className={styles.editButton}
                >
                    <Edit2 size={16} /> {editMode ? 'Done' : 'Edit'}
                </button>
            </div>

            <div className={styles.tableContainer}>
                <table className={styles.scheduler}>
                    <thead>
                        <tr>
                            <th className={styles.headerCell}>Time</th>
                            {daysOfWeek.map(day => (
                                <th
                                    key={day}
                                    className={styles.headerCell}
                                >
                                    {day}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {timeSlots.map(time => (
                            <tr key={time}>
                                <td className={styles.timeCell}>
                                    <div className={styles.timeCellContent}>
                                        {time}
                                        {editMode && (
                                            <button
                                                onClick={() =>
                                                    removeTimeSlot(time)
                                                }
                                                className={styles.deleteButton}
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        )}
                                    </div>
                                </td>
                                {daysOfWeek.map(day => (
                                    <td
                                        key={`${day}-${time}`}
                                        className={`${styles.scheduleCell} ${
                                            schedule[day]?.[time]
                                                ? styles.scheduled
                                                : ''
                                        }`}
                                        onClick={() =>
                                            toggleScheduleItem(day, time)
                                        }
                                    >
                                        <div className={styles.cellContent} />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
