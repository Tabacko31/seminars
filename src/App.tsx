import React, { useState, useEffect } from 'react';
import SeminarList from './components/SeminarList';
import EditSeminarModal from './components/EditSeminarModal';

// Определяем тип данных для семинара
export interface Seminar {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  photo: string;
}

const App: React.FC = () => {
  // Состояния: список семинаров, загрузка, ошибка, редактируемый семинар
  const [seminars, setSeminars] = useState<Seminar[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [editingSeminar, setEditingSeminar] = useState<Seminar | null>(null);

  // Загрузка данных с json-server при монтировании компонента
  useEffect(() => {
    const fetchSeminars = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:3001/seminars');
        if (!response.ok) {
          throw new Error('Ошибка при загрузке данных');
        }
        const data: Seminar[] = await response.json();
        setSeminars(data);
        setError('');
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSeminars();
  }, []);

  // Удаление семинара
  const handleDelete = async (id: number) => {
    if (!window.confirm('Вы уверены, что хотите удалить семинар?')) return;

    try {
      const response = await fetch(`http://localhost:3001/seminars/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Не удалось удалить семинар');
      }
      setSeminars(seminars.filter(seminar => seminar.id !== id));
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Открытие модального окна для редактирования
  const handleEdit = (seminar: Seminar) => {
    setEditingSeminar(seminar);
  };

  // Обновление семинара после редактирования
  const handleUpdate = async (updatedSeminar: Seminar) => {
    try {
      const response = await fetch(`http://localhost:3001/seminars/${updatedSeminar.id}`, {
        method: 'PUT', // Можно использовать PATCH, если обновляются не все поля
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedSeminar)
      });
      if (!response.ok) {
        throw new Error('Не удалось обновить семинар');
      }
      const data: Seminar = await response.json();
      setSeminars(seminars.map(seminar => seminar.id === data.id ? data : seminar));
      setEditingSeminar(null);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
      <div className="App">
        <h1>Семинары</h1>
        {loading && <p>Загрузка...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <SeminarList seminars={seminars} onDelete={handleDelete} onEdit={handleEdit} />
        {editingSeminar && (
            <EditSeminarModal
                seminar={editingSeminar}
                onClose={() => setEditingSeminar(null)}
                onSave={handleUpdate}
            />
        )}
      </div>
  );
};

export default App;
