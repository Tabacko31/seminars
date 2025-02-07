import React, { useState } from 'react';
import { Seminar } from '../App';

interface EditSeminarModalProps {
    seminar: Seminar;
    onClose: () => void;
    onSave: (updatedSeminar: Seminar) => void;
}

const EditSeminarModal: React.FC<EditSeminarModalProps> = ({ seminar, onClose, onSave }) => {
    const [formData, setFormData] = useState<Seminar>({ ...seminar });

    // Обработчик изменения данных формы
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    // Обработка отправки формы
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    const modalStyle: React.CSSProperties = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    };

    const modalContentStyle: React.CSSProperties = {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '4px',
        width: '400px'
    };

    return (
        <div style={modalStyle}>
            <div style={modalContentStyle}>
                <h2>Редактировать семинар</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Название:</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Описание:</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Дата:</label>
                        <input
                            type="text"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Время:</label>
                        <input
                            type="text"
                            name="time"
                            value={formData.time}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Фото (URL):</label>
                        <input
                            type="text"
                            name="photo"
                            value={formData.photo}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div style={{ marginTop: '10px' }}>
                        <button type="submit">Сохранить</button>
                        <button type="button" onClick={onClose} style={{ marginLeft: '10px' }}>
                            Отмена
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditSeminarModal;
