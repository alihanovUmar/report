import React, { useState } from 'react';

export default function Right() {
    const [inputValue, setInputValue] = useState('');
    const [textList, setTextList] = useState([]);
    const [count, setCount] = useState({});
    const [totalCount, setTotalCount] = useState(0);
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleAddClick = () => {
        if (inputValue.trim() !== '') {
            const words = inputValue.trim().split(/\s+/);

            const newList = [...textList, ...words];
            setTextList(newList);

            const newCount = {};
            newList.forEach((item) => {
                newCount[item] = (newCount[item] || 0) + 1;
            });

            setCount(newCount);
            setTotalCount(newList.length);
            setInputValue('');
        }
    };

    return (
        <div>
            <form>
                <div className="container">
                    <div className="form__wrapper">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={handleInputChange}
                        />
                        <button type="button" onClick={handleAddClick}>ADD</button>
                    </div>
                </div>
            </form>

            <div>
                <ul>
                    {Object.entries(count).map(([text, quantity]) => (
                        <>
                            <li key={text}>
                                {text}: {quantity}
                            </li>
                            <li>All: {totalCount}</li></>
                    ))}
                </ul>
            </div>
        </div>
    );
}