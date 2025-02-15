import styles from './page.module.css';
import Link from 'next/link';

export default async function Home() {
    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <h1>Welcome to Stay in Line, punk!</h1>
                <Link
                    className={styles.link}
                    href={'tasks'}
                >
                    Tasks
                </Link>
                <Link
                    className={styles.link}
                    href={'weekly-schedule'}
                ></Link>
            </main>
        </div>
    );
}
