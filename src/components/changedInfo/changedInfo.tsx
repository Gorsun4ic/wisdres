import { Stack } from "@mui/material";

import { Difference } from "@utils/findDiffObjs";
import upperCaseFirstLetter from "@utils/upperCaseFirstLetter";

const ChangedInfo = ({ differences }: { differences: Difference<T> }) => {

	if (!differences) {
		return <p>No changes found.</p>;
	}

	return (
		<div className="edit-property">
			<Stack direction="column" spacing={2}>
				{Object.keys(differences).map((key) => (
					<div key={key} className="edit-property__item">
						<p className="edit-property__title">{upperCaseFirstLetter(key)}</p>
						<p className="edit-property__old">
							Old version: {differences[key].from}
						</p>
						<p className="edit-property__new">
							New version: {differences[key].to}
						</p>
					</div>
				))}
			</Stack>
		</div>
	);
};

export default ChangedInfo;
