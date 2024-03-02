import React, { useState, useEffect } from 'react';
import styles from './styles/Body.module.css';
import Map from './Map';

const Body = ({ atmData }) => {
    const [items, setItems] = useState([]);
    let atmDataCopy = atmData
    // console.log(atmDataCopy.length)
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
    }, [atmData]);

    const toggleCheckbox = (id) => {
        setItems(items.map((item) =>
            item.id === id ? { ...item, checked: !item.checked } : item
        ));
    };

    const filterAtm = (item) => {
        toggleCheckbox(item.id)
        filterData(item.text)
        console.log('filterAtm', atmDataCopy.length)
    }

    const filterData = (text) => {
        atmDataCopy = []
        for (let k in atmData) {
            for (let l in atmData[k].accessibility) {
                if(atmData[k].accessibility[l] === text) {
                    atmDataCopy.push(atmData[k])
                }
            }
        }
    }
    
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
                            onChange={() => filterAtm(item)}
                        />
                        {item.text}
                    </label>
                ))}
            </div>
        </div>  
    );
};

export default Body;
