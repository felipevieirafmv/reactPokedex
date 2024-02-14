import CardsAdm from "../../components/CardsAdm";
import styles from './styles.module.scss';
import React, { useContext } from 'react';
import { ThemesContext } from "../../context/themes";

export default function AdmPage() {

    const { dark } = useContext(ThemesContext);

    const containerStyle = {
        '--background-color': dark ? '#333' : '#fff',
    };
    
    return (
        <>
        <div className={styles.container} style={containerStyle}>
            <CardsAdm/>
        </div>
        </>
    );
}
