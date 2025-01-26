'use client';

import { useState } from 'react';
import { ReservationWithAI } from '@/types';
import { format, parseISO } from 'date-fns';
import AIModal from './AIModal';

interface ReservationCardProps {
  reservation: ReservationWithAI;
  isAdmin: boolean;
}

export default function ReservationCard({ reservation, isAdmin }: ReservationCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Flight {reservation.flightNumber}
            </h3>
            <p className="text-sm text-gray-500">
              {format(parseISO(reservation.date), 'PPP')}
            </p>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
            reservation.status === 'confirmed' ? 'bg-green-100 text-green-800' :
            reservation.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
          </span>
        </div>

        {isAdmin && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Passengers:</h4>
            <ul className="space-y-2">
              {reservation.customers.map((customer) => (
                <li key={customer.id} className="text-sm text-gray-600">
                  {customer.name} - {customer.email}
                </li>
              ))}
            </ul>
          </div>
        )}

        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full mt-4 bg-indigo-50 text-indigo-600 px-4 py-2 rounded-md hover:bg-indigo-100 transition-colors"
        >
          View AI Insights
        </button>
      </div>

      <AIModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aiData={reservation.aiData}
        reservationId={reservation.id}
      />
    </>
  );
} 