import React, { useState } from 'react';
import { Quote } from '../types/quote';
import { Send } from 'lucide-react';

interface QuoteFormProps {
  onSubmit: (quote: Quote) => void;
}

export const QuoteForm: React.FC<QuoteFormProps> = ({ onSubmit }) => {
  const [quote, setQuote] = useState<Quote>({
    author: '',
    content: '',
    rating: 0
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(quote);
    setQuote({ author: '', content: '', rating: 0 });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
      <div>
        <label htmlFor="author" className="block text-sm font-medium text-gray-700">
          Autor
        </label>
        <input
          type="text"
          id="author"
          value={quote.author}
          onChange={(e) => setQuote({ ...quote, author: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
          Contenido
        </label>
        <textarea
          id="content"
          value={quote.content}
          onChange={(e) => setQuote({ ...quote, content: e.target.value })}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
          Puntuación (0-5)
        </label>
        <input
          type="number"
          id="rating"
          min="0"
          max="5"
          value={quote.rating}
          onChange={(e) => setQuote({ ...quote, rating: parseInt(e.target.value) })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>

      <button
        type="submit"
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <Send className="w-4 h-4 mr-2" />
        Guardar Cita
      </button>
    </form>
  );
};