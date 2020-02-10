import React from 'react';
import Locations from '../components/locations';
import locations from '../fixtures/locations';

export default { title: 'PDC locations' };

export const SampleLocations = () => <Locations locations={ locations } />;

export const WithoutLocations = () => <Locations />;
