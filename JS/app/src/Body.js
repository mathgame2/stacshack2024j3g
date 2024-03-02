import React, { useState, useEffect } from 'react';
import styles from './styles/Body.module.css';
import Map from './Map';

const Body = ({ atmData }) => {
    const [items, setItems] = useState([]);
    const [atmDataCopy, setAtmDataCopy] = useState(atmData || []); // Initialize with atmData or empty array

    useEffect(() => {
        let accFilter = new Set();
        
        atmData?.forEach(atm => {
            atm.accessibility?.forEach(accessibility => {
                accFilter.add(accessibility);
            });
        });

        const accList = Array.from(accFilter).map((value, index) => ({
            id: index + 1,
            text: value,
            checked: false
        }));

        setItems(accList);
    }, [atmData]);

    useEffect(() => {
        // Filter atmData based on the checked items
        const checkedItems = items.filter(item => item.checked);
        console.log(checkedItems)
        if (checkedItems.length === 0) {
            setAtmDataCopy(atmData); // If no items are checked, show all atmData
        } else {
            const newAtmDataCopy = atmData?.filter(atm => 
                checkedItems.some(checkedItem => 
                    atm.accessibility?.includes(checkedItem.text)
                )
            );
            setAtmDataCopy(newAtmDataCopy);
        }
    }, [items, atmData]); // React to changes in items or atmData

    const toggleCheckbox = (id) => {
        setItems(prevItems => prevItems.map(item =>
            item.id === id ? { ...item, checked: !item.checked } : item
        ));
    };

    return (
        <div className={styles.bodyBox}>
            <div className={styles.mapBox}>
                <Map atmData={atmDataCopy} />
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
