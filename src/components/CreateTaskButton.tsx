'use client';

export default function CreateTaskButton() {
    return (
        <button
            onClick={async () => {
                const response = await fetch('api/tasks');
                console.log(await response.text());
            }}
        >
            Creeaza primul dummy task
        </button>
    );
}
