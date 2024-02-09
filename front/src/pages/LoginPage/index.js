import AlertComponent from "../../components/AlertComponent";
import CardLogin from "../../components/LoginCard/Index";
import styles from './styles.module.scss';

export default function LoginPage() {
    return (
        <>
            <div className={styles.appContainer}>

                <AlertComponent />
                <CardLogin />
            </div>
        </>
    )
}