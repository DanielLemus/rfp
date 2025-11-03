import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

const Dashboard = React.lazy(() => import('@/pages/Dashboard'));

export const AppRouter: React.FC = () => {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};
