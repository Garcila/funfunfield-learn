import firebase from 'firebase';

let config = {
	apiKey: 'AIzaSyCTV_QEv8tCt5rfTbQWpohuMSIbKpe6Vb8',
	authDomain: 'field-canvas.firebaseapp.com',
	databaseURL: 'https://field-canvas.firebaseio.com',
	projectId: 'field-canvas',
	storageBucket: '',
	messagingSenderId: '677058726718'
};
let fire = firebase.initializeApp(config);
export default fire;
