'use client';

import { useEffect, useState } from 'react';

type Patient = {
  id: number;
  name: string;
  sex: string;
  department: string;
  status: string;
};

export default function Home() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [departments, setDepartments] = useState<string[]>([]);

  useEffect(() => {
    fetchPatients();
  }, [selectedDepartment]);

  const fetchPatients = async () => {
    setLoading(true);
    try {
      const url = selectedDepartment === 'all' 
        ? '/api/patients' 
        : `/api/patients?department=${encodeURIComponent(selectedDepartment)}`;
      
      const response = await fetch(url);
      const data = await response.json();
      setPatients(data);
      
      if (selectedDepartment === 'all') {
        const uniqueDepts = [...new Set(data.map((p: Patient) => p.department))] as string[];
        setDepartments(uniqueDepts);
      }
    } catch (error) {
      console.error('Error fetching patients:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50">
      {/* Синяя шапка */}
      <div className="bg-blue-700 border-b border-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold text-white">Пациенты</h1>
            <div className="flex gap-4">
              <button className="text-blue-100 hover:text-white transition">Новый пациент</button>
              <button className="text-blue-100 hover:text-white transition">Настройки</button>
              <button className="text-red-300 hover:text-red-100 transition">Выход</button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Фильтр */}
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-gray-700">Фильтр по отделению:</label>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="block w-48 pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-white text-gray-900"
            >
              <option value="all">Все отделения</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
          <div className="text-sm text-gray-600 bg-white px-3 py-1 rounded-full">
            Всего пациентов: {patients.length}
          </div>
        </div>

        {/* Таблица */}
        <div className="bg-white shadow-lg overflow-hidden sm:rounded-lg">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-blue-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">#</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">ФИО</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider hidden sm:table-cell">Пол</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider hidden md:table-cell">Отделение</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider hidden lg:table-cell">Статус</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                      Загрузка...
                    </td>
                  </tr>
                ) : patients.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                      Нет пациентов
                    </td>
                  </tr>
                ) : (
                  patients.map((patient) => (
                    <tr key={patient.id} className="hover:bg-blue-50 transition">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{patient.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{patient.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">{patient.sex}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">{patient.department}</td>
                      <td className="px-6 py-4 whitespace-nowrap hidden lg:table-cell">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${patient.status === 'Активный' ? 'bg-green-100 text-green-800' : 
                            patient.status === 'На лечении' ? 'bg-yellow-100 text-yellow-800' :
                            patient.status === 'Выписан' ? 'bg-gray-100 text-gray-800' :
                            'bg-blue-100 text-blue-800'}`}>
                          {patient.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
