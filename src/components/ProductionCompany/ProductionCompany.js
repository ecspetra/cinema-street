import React from "react";
import {Link} from "react-router-dom";

const ProductionCompany = (props) => {
	return (
		<Link to={"/company/" + props.company.id} className="production-company" onClick={() => {props.handleSetCompanyPage(props.company)}}>
			<span className="production-company__name">{props.company.name}</span>
		</Link>
	);
}

export default ProductionCompany;