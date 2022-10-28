import React from 'react';
import { Sight } from '../../interfaces/common';
import DashboardComponent from './dashboard.component';
import mockSightList from '../sight/mocks-sights.json';

export default function Dashboard() {
  const lastSightsList: Sight[] = mockSightList;
    
  return (
    <DashboardComponent lastSightsList={lastSightsList}/>
  );
}