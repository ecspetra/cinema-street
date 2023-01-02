import React, {useState} from "react";
import './assets/index.scss';
import Tooltip from "../Tooltip/Tooltip";
import { addDefaultImage } from "../../functions/addDefaultImage";
import defaultImage from "../App/assets/icons/default-image.svg";
import Loader from "../Loader/Loader";

const ProductionCompany = (props) => {

	const { company } = props;

	const [isImageLoaded, setIsImageLoaded] = useState(false);
	const [isShowTooltip, setIsShowTooltip] = useState(false);

	return (
		<div className="production-company">
			<div className="production-company__item" onMouseEnter={() => {setIsShowTooltip(true)}} onMouseLeave={() => {setIsShowTooltip(false);}}>
				<span className="production-company__name">{company.name}</span>
			</div>
			<Tooltip isShowTooltip={isShowTooltip} title={company.name} description={company.origin_country}>
				<div className="tooltip__image-wrap">
					<img className="tooltip__image" onError={event => addDefaultImage(event, defaultImage)} onLoad={() => {setIsImageLoaded(true)}} src={'https://image.tmdb.org/t/p/w200' + company.logo_path} alt="company-logo" />
					{!isImageLoaded && <Loader>Loading image</Loader>}
				</div>
			</Tooltip>
		</div>
	);
}

export default ProductionCompany;