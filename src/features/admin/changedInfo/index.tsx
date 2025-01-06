const ChangedInfo = ({ propertyToChange, oldVersion, newVersion }) => {
	if (
		!propertyToChange ||
		oldVersion === undefined ||
		newVersion === undefined
	) {
		return <p>No changes found.</p>;
	}
	
	return (
		<div className="edit-property">
			{/* <p className="edit-property__title">{propertyToChange}</p> */}
			{/* <p className="edit-property__old">Old version: {oldVersion}</p> */}
			{/* <p className="edit-property__new">New version: {newVersion}</p> */}
			<p>old vers</p>
			<p>new vers</p>
		</div>
	);
};

export default ChangedInfo;
