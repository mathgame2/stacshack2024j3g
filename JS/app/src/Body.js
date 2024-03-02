import React from 'react';
import styles from './styles/Body.module.css'
import Map from './Map'

const Body = () => {
    return (
        <div className={styles.bodyBox}>
            <div className={styles.mapBox}>
                <Map />
            </div>
            <div className={styles.menuBox}>
                menu
            </div>
        </div>  
    );
};

export default Body;