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

  // Подсчёт общего количества уникальных имён (не дубликаты)
  const uniqueNamesCount = [...names].filter((name) => !duplicates[name]).length;

  // Подсчёт общего количества дубликатов
  const duplicateCount = Object.values(duplicates).reduce((acc, count) => acc + count - 1, 0);

  // Подсчёт общего количества добавленных имён (уникальные + дубликаты)
  const totalNamesCount = [...names].length + duplicateCount;

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
          <h3>Summary:</h3>
          <p>Общее количество уникальных не дублирующихся имён: {uniqueNamesCount}</p>
          <p>Общее количество дубликатов: {duplicateCount}</p>
          <p>Общее количество добавленных имён: {totalNamesCount}</p>
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
          <ol>
            {Object.entries(duplicates).map(([duplicate, count], index) => (
              <li key={index}>
                {duplicate}: {count}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </form>
  );
}
