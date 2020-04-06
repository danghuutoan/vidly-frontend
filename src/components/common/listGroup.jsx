import React, { Component } from "react";

class ListGroup extends Component {
	state = {};
	render() {
		const {
			items,
			onItemSelect,
			selectedItem,
			textProperty,
			valueProperty
		} = this.props;

		return (
			<ul className="list-group">
				{items.map(item => (
					<li
						key={item[valueProperty]}
						onClick={() => onItemSelect(item)}
						className={
							item === selectedItem
								? "list-group-item active"
								: "list-group-item "
						}
					>
						{item[textProperty]}
					</li>
				))}
			</ul>
		);
	}
}

ListGroup.defaultProps = {
	textProperty: "name",
	valueProperty: "_id"
};
export default ListGroup;
