import React from 'react';
import { Seminar } from '../App';

interface SeminarItemProps {
    seminar: Seminar;
    onDelete: (id: number) => void;
    onEdit: (seminar: Seminar) => void;
}

const SeminarItem: React.FC<SeminarItemProps> = ({ seminar, onDelete, onEdit }) => {
    return (
        <div
            className="seminar-item"
            style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}
        >
            <img
                src={seminar.photo}
                alt={seminar.title}
                style={{ width: '150px', height: 'auto' }}
            />
            <h2>{seminar.title}</h2>
            <p>{seminar.description}</p>
            <p>{seminar.date} в {seminar.time}</p>
            <button onClick={() => onEdit(seminar)}>Редактировать</button>
            <button onClick={() => onDelete(seminar.id)}>Удалить</button>
        </div>
    );
};

export default SeminarItem;
