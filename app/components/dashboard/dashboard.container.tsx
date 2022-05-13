import React from 'react';
import { Sight } from '../../interfaces/common';
import DashboardComponent from './dashboard.component';
import mockSightList from './sight/mocks-sights.json';


export default function Dashboard({ navigation }: { navigation: any }) {
  const lastSightsList: Array<Sight> = mockSightList;
    
  return (
    <DashboardComponent lastSightsList={lastSightsList}/>
  );
}