import CreateTaskButton from '@/components/CreateTaskButton';
import styles from './page.module.css';

export default function Home() {
    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <h1>Welcome to Stay in Line, punk!</h1>
                <CreateTaskButton />
            </main>
        </div>
    );
}
