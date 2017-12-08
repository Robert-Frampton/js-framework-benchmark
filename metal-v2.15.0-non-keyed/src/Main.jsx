'use strict';

import Component, {Config} from 'metal-jsx';
const { Row } = require('./Row');

const { run, runLots, add, update, swapRows, deleteRow } = require('./utils');

let startTime;
let lastMeasure;

const startMeasure = function (name) {
	startTime = performance.now();
	lastMeasure = name;
}

const stopMeasure = function () {
	let last = lastMeasure;
	if (lastMeasure) {
		window.setTimeout(function () {
			lastMeasure = null;
			let stop = performance.now();
			let duration = 0;
			console.log(last + " took " + (stop - startTime));
		}, 0);
	}
}

class Main extends Component {
	created() {
		this.select = this.select.bind(this);
		this.delete = this.delete.bind(this);
		this.add = this.add.bind(this);
		this.run = this.run.bind(this);
		this.update = this.update.bind(this);
		this.runLots = this.runLots.bind(this);
		this.clear = this.clear.bind(this);
		this.swapRows = this.swapRows.bind(this);
		this.start = 0;
	}

	printDuration() {
		stopMeasure();
	}

	rendered() {
		this.printDuration();
	}

	attached() {
		this.printDuration();
	}

	run() {
		startMeasure("run");
		const { id } = this.state;
		const obj = run(id);
		console.log('id', id);
		this.setState({ data: obj.data, id: obj.id, selected: undefined });
	}

	add() {
		startMeasure("add");
		const { id } = this.state;
		const obj = add(id, this.state.data);
		this.setState({ data: obj.data, id: obj.id});
	}

	update() {
		startMeasure("update");
		const data = update(this.state.data);
		this.setState({ data: data });
	}

	select(id) {
		startMeasure("select");
		this.setState({ selected: id });
	}

	delete(id) {
		startMeasure("delete");
		const data = deleteRow(this.state.data, id);
		this.setState({ data: data });
	}

	runLots() {
		startMeasure("runLots");
		const { id } = this.state;
		const obj = runLots(id);
		this.setState({ data: obj.data, id: obj.id, selected: undefined });
	}

	clear() {
		startMeasure("clear");
		this.setState({ data: [], selected: undefined });
	}

	swapRows() {
		startMeasure("swapRows");
		const data = swapRows(this.state.data);
		this.setState({ data: data });
	}

	render() {
		let rows = this.state.data.map((d, i) => {
			return <Row data={d} onClick={this.select} onDelete={this.delete} styleClass={d.id === this.state.selected ? 'danger':''}></Row>
		});
		return (<div class="container">
			<div class="jumbotron">
				<div class="row">
					<div class="col-md-6">
						<h1>Metal.js v2.15.0</h1>
					</div>
					<div class="col-md-6">
						<div class="row">
							<div class="col-sm-6 smallpad">
								<button type="button" class="btn btn-primary btn-block" id="run" onClick={this.run}>Create 1,000 rows</button>
							</div>
							<div class="col-sm-6 smallpad">
								<button type="button" class="btn btn-primary btn-block" id="runlots" onClick={this.runLots}>Create 10,000 rows</button>
							</div>
							<div class="col-sm-6 smallpad">
								<button type="button" class="btn btn-primary btn-block" id="add" onClick={this.add}>Append 1,000 rows</button>
							</div>
							<div class="col-sm-6 smallpad">
								<button type="button" class="btn btn-primary btn-block" id="update" onClick={this.update}>Update every 10th row</button>
							</div>
							<div class="col-sm-6 smallpad">
								<button type="button" class="btn btn-primary btn-block" id="clear" onClick={this.clear}>Clear</button>
							</div>
							<div class="col-sm-6 smallpad">
								<button type="button" class="btn btn-primary btn-block" id="swaprows" onClick={this.swapRows}>Swap Rows</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<table class="table table-hover table-striped test-data">
				<tbody>
					{rows}
				</tbody>
			</table>
			<span class="preloadicon glyphicon glyphicon-remove" aria-hidden="true"></span>
		</div>);
	}
}

Main.STATE = {
	data: Config.value([]),
	selected: Config.value(undefined),
	id: Config.value(1)
};

export default Main;
