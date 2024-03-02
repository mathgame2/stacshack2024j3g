import React from 'react';
import styles from './styles/Body.module.css'
import Map from './Map'

const Body = ({ atmData }) => { // Destructure atmData directly
    return (
        <div className={styles.bodyBox}>
            <div className={styles.mapBox}>
                <Map atmData={atmData} /> {/* Pass atmData directly */}
            </div>
            <div className={styles.menuBox}>
                menu
            </div>
        </div>  
    );
};

export default Body;
