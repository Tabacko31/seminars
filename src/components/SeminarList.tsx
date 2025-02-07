import React from 'react';
import SeminarItem from './SeminarItem';
import { Seminar } from '../App';

interface SeminarListProps {
    seminars: Seminar[];
    onDelete: (id: number) => void;
    onEdit: (seminar: Seminar) => void;
}

const SeminarList: React.FC<SeminarListProps> = ({ seminars, onDelete, onEdit }) => {
    return (
        <div className="seminar-list">
            {seminars.map(seminar => (
                <SeminarItem
                    key={seminar.id}
                    seminar={seminar}
                    onDelete={onDelete}
                    onEdit={onEdit}
                />
            ))}
        </div>
    );
};

export default SeminarList;
