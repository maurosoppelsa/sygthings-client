import React from 'react';
import DashboardComponent from './dashboard.component';


export default function Dashboard({ navigation }: { navigation: any }) {
  const lastSightsList = [
    {
      location: '',
      province: '',
      animal: '',
      picture: ''
    }, 
    {
      location: '',
      province: '',
      animal: '',
      picture: ''
    }, 
    {
      location: '',
      province: '',
      animal: '',
      picture: ''
    },
    {
      location: '',
      province: '',
      animal: '',
      picture: ''
    }, {
      location: '',
      province: '',
      animal: '',
      picture: ''
    },
    {
      location: '',
      province: '',
      animal: '',
      picture: ''
    },
    {
      location: '',
      province: '',
      animal: '',
      picture: ''
    }, {
      location: '',
      province: '',
      animal: '',
      picture: ''
    }, {
      location: '',
      province: '',
      animal: '',
      picture: ''
    }
  ];
  return (
    <DashboardComponent lastSightsList={lastSightsList}/>
  );
}