'use strict';

import Component, {Config} from 'metal-jsx';

window.rowsUpdated = 0;
window.rowsMounted = 0;

class Child1 extends Component {
	render() {
		return <div><Child2 />{this.state.value}</div>
	}
}

Child1.STATE = {
	value: Config.value('Child1')
}

class Child2 extends Component {
	render() {
		return <div><Child3 />{this.state.value}</div>
	}
}

Child2.STATE = {
	value: Config.value('Child2')
}

class Child3 extends Component {
	render() {
		return <div><Child4 />{this.state.value}</div>
	}
}

Child3.STATE = {
	value: Config.value('Child3')
}

class Child4 extends Component {
	render() {
		return <div><Child5 />{this.state.value}</div>
	}
}

Child4.STATE = {
	value: Config.value('Child4')
}

class Child5 extends Component {
	render() {
		return <div>{this.state.value}</div>
	}
}

Child5.STATE = {
	value: Config.value('Child5')
}

export class Row extends Component {
	created() {
		this.onDelete = this.onDelete.bind(this);
		this.onClick = this.onClick.bind(this);
	}
	shouldUpdate(stateChanged, propsChanged) {
		const {data, styleClass} = propsChanged;

		return (data && data.newVal !== data.prevVal) || (styleClass && styleClass.newVal !== styleClass.prevVal);
	}
	onDelete() {
		this.props.onDelete(this.props.data.id);
	}
	onClick() {
		this.props.onClick(this.props.data.id);
	}

	render() {
		let {styleClass, onClick, onDelete, data} = this.props;
		return (<tr class={styleClass}>
			<td class="col-md-1">{data.id}</td>
			<td class="col-md-4">
				<a onClick={this.onClick}>{data.label}</a>
			</td>
			<td class="col-md-1"><a onClick={this.onDelete}><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></a></td>
			<td class="col-md-6"><Child1 /></td>
		</tr>);
	}
}

