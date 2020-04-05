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
		let classes = "list-group-item ";

		return (
			<ul className="list-group">
				{items.map(item => (
					<li
						key={item[valueProperty]}
						onClick={() => onItemSelect(item)}
						className={
							item === selectedItem
								? "list-group-item active"
								: classes
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
