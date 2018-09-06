import React, { Component } from 'react';
import './App.css';

import { SwatchesPicker } from 'react-color';
import fire from './fire';

const firestore = fire.firestore();

firestore.settings({
	timestampsInSnapshots: true
});

const pixelSize = 20;

class App extends Component {
	state = {
		pixels: [
			{ x: 15, y: 10, color: '#99CCFF' },
			{ x: 10, y: 3, color: '#ffddaa' }
		]
	};

	handleChangeComplete = color => {
		fire
			.firestore()
			.collection('pixels')
			.add({
				...this.state.selectedSpot,
				color: color.hex
			});
		const newPoint = { ...this.state.selectedSpot, color: color.hex };
		const pixels = [...this.state.pixels, newPoint];
		this.setState({ pixels });
		this.setState({ selectedSpot: null });
	};

	getSpotOnCanvas = event => {
		if (this.state.selectedSpot) return;

		const coordinate = {
			x: Math.floor(event.clientX / pixelSize),
			y: Math.floor(event.clientY / pixelSize)
		};

		this.setState({ selectedSpot: coordinate });
		// fire
		// 	.firestore()
		// 	.collection('pixels')
		// 	.onSnapshot(collection =>
		// 		this.setState({
		// 			pixels: collection.docs.map(doc => doc.data())
		// 		})
		// 	);
	};
	render() {
		return (
			<div
				className="App"
				onClick={this.getSpotOnCanvas}
				style={{
					position: 'absolute',
					height: 1000,
					width: 1000,
					border: '1px solid gray'
				}}
			>
				{this.state.pixels.map((p, i) => (
					<div
						key={i}
						style={{
							position: 'absolute',
							left: p.x * pixelSize,
							top: p.y * pixelSize,
							backgroundColor: p.color,
							width: pixelSize,
							height: pixelSize
						}}
					/>
				))}

				{this.state.selectedSpot && (
					<div
						style={{
							position: 'absolute',
							left: this.state.selectedSpot.x * pixelSize,
							top: this.state.selectedSpot.y * pixelSize
						}}
					>
						<SwatchesPicker
							onChangeComplete={this.handleChangeComplete}
						/>
					</div>
				)}
			</div>
		);
	}
}

export default App;
