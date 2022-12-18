import React, { useState } from "react";
import Backdrops from '../Backdrops/Backdrops';
import MoreButton from "../MoreButton/MoreButton";

const BackdropsList = (props) => {

	const { backdrops } = props;

	const initialListLength = 4;

	const [maxListLength, setMaxListLength] = useState(initialListLength);
	const isShowMoreButton = backdrops.length !== 0;

	const buttonText = backdrops.length !== maxListLength ? 'Show all' : 'Show less';

	const getBackdrops = () => {
		if (backdrops.length !== maxListLength) {
			setMaxListLength(backdrops.length);
		} else {
			setMaxListLength(initialListLength);
		}
	}

	return (
		<>
			{
				backdrops.length !== 0 ? (
					<>
						<div className="backdrops-list">
							{(backdrops && backdrops.map((item, index) => {
								if (index < maxListLength) {
									return <Backdrops backdrops={item} key={index} />
								}
							}))
							}
						</div>
						{
							isShowMoreButton && <MoreButton listLength={backdrops.length} maxListLength={maxListLength} moreButtonOnClickFunction={getBackdrops} />
						}
					</>
				)
					: <p className="backdrops-list-empty">No backdrops yet</p>
			}
		</>

	)
}

export default BackdropsList;