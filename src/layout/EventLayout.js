import React from 'react';
import EventsNavigation from './EventNavigation';
import { Outlet } from 'react-router-dom';

const EventLayout = () => {
  return (
    <>
      <EventsNavigation />
      <Outlet />
    </>
  );
};

export default EventLayout;
