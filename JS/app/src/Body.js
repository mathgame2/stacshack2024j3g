import React, { useState, useEffect } from 'react';
import styles from './styles/Body.module.css';
import Map from './Map';

const Body = ({ atmData }) => {
    const [items, setItems] = useState([]);
    const [atmDataCopy, setAtmDataCopy] = useState(atmData || []); 

    useEffect(() => {
        let accFilter = new Set();
        
        atmData?.forEach(atm => {
            atm.accessibility?.forEach(accessibility => {
                accFilter.add(accessibility);
            });
           
            // accFilter.add("\"allday\"")
            atm.services?.forEach(services => {
                accFilter.add(services);
            });
        });
        console.log(atmData)
        
        const accList = Array.from(accFilter).map((value, index) => ({
            id: index + 1,
            text: value,
            checked: false
        }));
        // for (let i in accList) {
        //     // Remove non-alphanumeric characters and add space before capital letters
        //     accList[i].text = accList[i].text
        //         .replace(/[^a-zA-Z0-9]/g, '')
        //         // .replace(/([A-Z])/g, ' $1')
        //         // .trim();
        // }
        setItems(accList);
    }, [atmData]);

    useEffect(() => {
        const checkedItems = items.filter(item => item.checked);
    
        if (checkedItems.length === 0) {
            setAtmDataCopy(atmData);
        } else {
            const newAtmDataCopy = atmData?.filter(atm =>
                checkedItems.every(checkedItem => 
                    atm.accessibility?.includes(checkedItem.text) || atm.services?.includes(checkedItem.text)
                )
            );
            setAtmDataCopy(newAtmDataCopy);
        }
    }, [items, atmData]);
    
    

    const toggleCheckbox = (id) => {
        setItems(prevItems => prevItems.map(item =>
            item.id === id ? { ...item, checked: !item.checked } : item
        ));
    };

    const clearCheckbox = () => {
        setItems(items.map(item => ({ ...item, checked: false })));
        setAtmDataCopy(atmData);
    };

    return (
        <div className={styles.bodyBox}>
            <div className={styles.mapBox}>
                <Map atmData={atmDataCopy} />
            </div>
            <div className={styles.menuBox}>
                <h2>Filter</h2>
                {items.map((item) => (
                    <div className={styles.filterBtns}>
                        <label key={item.id}>
                            <input class="nes-checkbox"
                                type="checkbox"
                                checked={item.checked}
                                onChange={() => toggleCheckbox(item.id)}
                            />
                            <span>{item.text}</span>
                        </label>
                    </div>
                ))}
                <button className={styles.clearBtn} onClick={()=>clearCheckbox()}>Clear</button>
            </div>
        </div>  
    );
};

export default Body;
