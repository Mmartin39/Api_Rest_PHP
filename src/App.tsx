import { useState, useEffect } from 'react';
import axios from 'axios';
import { Quote } from './types/quote';
import { QuoteForm } from './components/QuoteForm';
import { QuoteList } from './components/QuoteList';
import { Toaster, toast } from 'react-hot-toast';
import { Quote as QuoteIcon } from 'lucide-react';

const API_URL = 'http://localhost:8000/api';

function App() {
  const [quotes, setQuotes] = useState<Quote[]>([]);

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    try {
      const response = await axios.get(`${API_URL}/quotes`);
      setQuotes(response.data);
    } catch (error) {
      toast.error('Error al cargar las citas');
    }
  };

  const handleSubmit = async (quote: Quote) => {
    try {
      await axios.post(`${API_URL}/quotes`, quote);
      toast.success('Cita guardada exitosamente');
      fetchQuotes();
    } catch (error) {
      toast.error('Error al guardar la cita');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster position="top-right" />
      
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <QuoteIcon className="w-12 h-12 text-indigo-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Gestor de Citas</h1>
          <p className="mt-2 text-gray-600">Sistema de gestión de citas con puntuación</p>
        </div>

        <div className="space-y-10">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Nueva Cita</h2>
            <QuoteForm onSubmit={handleSubmit} />
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Citas Guardadas</h2>
            <QuoteList quotes={quotes} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;