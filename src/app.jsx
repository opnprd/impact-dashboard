import React from 'react';
import ReactDOM from 'react-dom';
import Dashboard from './components/Dashboard.jsx';

export function initialise(options = {}) {
  const { appRootId = 'dashboard-app' } = options;

  ReactDOM.render(
    <Dashboard source='./config/reports.yaml'
      title='Yorkshire Impact Dashboard'
    />,
    document.getElementById(appRootId)
  );
};
