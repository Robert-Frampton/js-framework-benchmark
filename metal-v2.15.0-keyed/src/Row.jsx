'use strict';

import Component, {Config} from 'metal-jsx';

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
			<td class="col-md-6"></td>
		</tr>);
	}
}

Row.PROPS = {
	data: {},
	styleClass: {}
};
