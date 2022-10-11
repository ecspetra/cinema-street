import React from "react";
import Backdrops from '../Backdrops/Backdrops';

const BackdropsList = (props) => {

	const backdrops = props.backdrops;

	return (
		<div className="backdrops-list">
			{
				backdrops && backdrops.map((item, index) => {
					if (index <= 3) {
						return <Backdrops backdrops={item} key={index} />
					}
				})
			}
		</div>
	)
}

export default BackdropsList;