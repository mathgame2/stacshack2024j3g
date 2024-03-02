import React, { useState, useEffect } from 'react';
import styles from './styles/Body.module.css';
import Map from './Map';

const Body = ({ atmData }) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        let accFilter = new Set();
        
        if (atmData) {
            for (let i in atmData) {
                for (let j in atmData[i].accessibility) {
                    accFilter.add(atmData[i].accessibility[j]);
                }
            }

            const accList = Array.from(accFilter).map((value, index) => ({
                id: index + 1,
                text: value,
                checked: false
            }));

            setItems(accList);
        }
    }, [atmData]); // Depend on atmData so it updates when atmData changes
    
    const toggleCheckbox = (id) => {
        setItems(items.map((item) =>
            item.id === id ? { ...item, checked: !item.checked } : item
        ));
    };
    
    return (
        <div className={styles.bodyBox}>
            <div className={styles.mapBox}>
                <Map atmData={atmData} />
            </div>
            <div className={styles.menuBox}>
                {items.map((item) => (
                    <label key={item.id}>
                        <input
                            type="checkbox"
                            checked={item.checked}
                            onChange={() => toggleCheckbox(item.id)}
                        />
                        {item.text}
                    </label>
                ))}
            </div>
        </div>  
    );
};

export default Body;
