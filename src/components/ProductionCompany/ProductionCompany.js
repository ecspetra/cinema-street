import React from "react";

const ProductionCompany = (props) => {
	return (
		<div className="production-company">
			<span className="production-company__name">{props.company.name}</span>
		</div>
	);
}

export default ProductionCompany;