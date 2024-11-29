import React, { useState } from 'react';

export default function Left() {
  const [names, setNames] = useState(new Set());
  const [duplicates, setDuplicates] = useState({});
  const [currentName, setCurrentName] = useState('');

  const handleInputChange = (e) => {
    setCurrentName(e.target.value);
  };

  const handleAddName = (e) => {
    e.preventDefault();
    if (currentName.trim() !== '') {
      const cleanedInput = currentName.replace(/\s+/g, ' ').trim();
      const nameParts = splitByEverySecondSpace(cleanedInput);

      const newNames = new Set(names);
      const newDuplicates = { ...duplicates };

      nameParts.forEach((name) => {
        if (newNames.has(name)) {
          newDuplicates[name] = (newDuplicates[name] || 1) + 1;
        } else {
          newNames.add(name);
        }
      });

      setNames(newNames);
      setDuplicates(newDuplicates);
      setCurrentName(''); 
    }
  };

  const splitByEverySecondSpace = (str) => {
    const parts = str.split(' ');
    const result = [];

    for (let i = 0; i < parts.length; i += 2) {
      const name = parts.slice(i, i + 2).join(' '); 
      result.push(name);
    }

    return result;
  };

  return (
    <form onSubmit={handleAddName}>
      <div className="container">
        <div className="form__wrapper">
          <input
            type="text"
            value={currentName}
            onChange={handleInputChange}
            placeholder="Введите имена и фамилии"
          />
          <button type="submit">ADD</button>
        </div>

        <div>
          <h3>Names:</h3>
          <ol>
            {[...names].map((namePart, index) => (
              <li key={index}>{namePart}</li>
            ))}
          </ol>
        </div>

        <div>
          <h3>Duplicates:</h3>
          <ul>
            {Object.entries(duplicates).map(([duplicate, count], index) => (
              <li key={index}>
                {duplicate}: {count}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </form>
  );
}
