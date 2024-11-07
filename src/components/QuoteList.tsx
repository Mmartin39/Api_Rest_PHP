import React from 'react';
import { Quote } from '../types/quote';
import { Star, Clock } from 'lucide-react';

interface QuoteListProps {
  quotes: Quote[];
}

export const QuoteList: React.FC<QuoteListProps> = ({ quotes }) => {
  return (
    <div className="space-y-4">
      {quotes.map((quote, index) => (
        <div key={quote.id || index} className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold text-gray-900">{quote.author}</h3>
            <div className="flex items-center space-x-2">
              <div className="flex items-center text-yellow-500">
                <Star className="w-5 h-5 mr-1" />
                <span>{quote.rating}/5</span>
              </div>
              {quote.created_at && (
                <div className="flex items-center text-gray-500 text-sm">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{new Date(quote.created_at).toLocaleDateString()}</span>
                </div>
              )}
            </div>
          </div>
          <p className="text-gray-600">{quote.content}</p>
        </div>
      ))}
    </div>
  );
};