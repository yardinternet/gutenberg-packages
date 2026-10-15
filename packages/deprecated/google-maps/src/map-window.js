// In the editor the map element lives in the canvas iframe, so the Maps API is loaded into and used from that window.
let mapWindow = window;

export const setMapWindow = ( win ) => {
	mapWindow = win;
};

export const getMapWindow = () => mapWindow;

export const getGoogle = () => mapWindow.google;
