'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

window.rowsUpdated = 0;
window.rowsMounted = 0;

class Child1 extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			value: 'Child1'
		};
	}
	render() {
		return <div><Child2 />{this.state.value}</div>
	}
}

class Child2 extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			value: 'Child2'
		};
	}
	render() {
		return <div><Child3 />{this.state.value}</div>
	}
}

class Child3 extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			value: 'Child3'
		};
	}
	render() {
		return <div><Child4 />{this.state.value}</div>
	}
}

class Child4 extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			value: 'Child4'
		};
	}
	render() {
		return <div><Child5 />{this.state.value}</div>
	}
}

class Child5 extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			value: 'Child5'
		};
	}
	render() {
		return <div>{this.state.value}</div>
	}
}

export class Row extends React.Component {
	constructor(props) {
		super(props);
		this.onDelete = this.onDelete.bind(this);
		this.onClick = this.onClick.bind(this);
	}
	shouldComponentUpdate(nextProps, nextState) {
		return nextProps.data !== this.props.data || nextProps.styleClass !== this.props.styleClass;
	}
//	componentDidUpdate() {
//		window.rowsUpdated++;
//	}
//	componentDidMount() {
//		window.rowsMounted++;
//	}

	onDelete() {
		this.props.onDelete(this.props.data.id);
	}
	onClick() {
		this.props.onClick(this.props.data.id);
	}

	render() {
		let {styleClass, onClick, onDelete, data} = this.props;
		return (<tr className={styleClass}>
			<td className="col-md-1">{data.id}</td>
			<td className="col-md-4">
				<a onClick={this.onClick}>{data.label}</a>
			</td>
			<td className="col-md-1"><a onClick={this.onDelete}><span className="glyphicon glyphicon-remove" aria-hidden="true"></span></a></td>
			<td className="col-md-6"><Child1 /></td>
		</tr>);
	}
}

