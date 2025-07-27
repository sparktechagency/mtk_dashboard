import React from 'react';
import type { StatusType } from '../../types/employer.type';

interface StatusBadgeProps {
  status: StatusType;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getBadgeColor = () => {
    switch (status) {
      case 'Active':
        return 'bg-green-400 text-green-800';
      case 'Reported':
        return 'bg-orange-300 text-orange-800';
      case 'Block':
        return 'bg-red-300 text-red-800';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${getBadgeColor()}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;