import React, { useState } from 'react';
import styles from './styles/Body.module.css'
import Map from './Map'


const Body = ({ atmData }) => {
    let accFilter = new Set()
    for (let i in atmData) {
        for (let j in atmData[i].accessibility) {
            accFilter.add(atmData[i].accessibility[j])
        }
    }
    const accList = []
    let c = 1
    accFilter.forEach(function(value){
        accList.push({id:c, text:value, checked:false})
        c = c+1
    })    
    const [items, setItems] = useState(accList);
    const toggleCheckbox = (id) => {
        setItems(
            items.map((item) => 
                item.id === id ? { ...item, checked: !item.checked } : item
            )
        );
    };

    return (
        <div className={styles.bodyBox}>
            <div className={styles.mapBox}>
                <Map atmData={atmData} />
            </div>
            <div className={styles.menuBox}>
                {items.map((item) => (
                    <div key={item.id}>
                        <input
                            type="checkbox"
                            checked={item.checked}
                            onChange={() => toggleCheckbox(item.id)}
                        />
                        {item.text}
                    </div>
                ))}               
            </div>
        </div>  
    );
};

export default Body;
