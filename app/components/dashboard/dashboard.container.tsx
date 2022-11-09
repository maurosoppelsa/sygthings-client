import React from 'react';
import { Sight } from '../../interfaces/common';
import mockSightList from '../sight/mocks-sights.json';
import SightListComponent from '../sight/sight-list.component';

export default function Dashboard() {
  const lastSightsList: Sight[] = mockSightList;

  return (
    <SightListComponent sightList={lastSightsList} listTitle={"What people seen..."} />
  );
}