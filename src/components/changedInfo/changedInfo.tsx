import { Stack } from "@mui/material";

import { useTranslation } from "react-i18next";


import upperCaseFirstLetter from "@utils/upperCaseFirstLetter";


interface Change {
	from: string | number;
	to: string | number;
}

interface Changes {
	[key: string]: Change | Changes;
}

const formatValue = (value: string | number): string => {
	if (value === null || value === undefined) {
		return "none";
	}

	if (Array.isArray(value)) {
		return value
			.map((item) =>
				typeof item === "object" ? item.title || JSON.stringify(item) : item
			)
			.join(", ");
	}

	return String(value);
};

const handleNestedObject = (differences: Changes) => {
	if (!differences) return [];

	const changes: { field: string; change: Change }[] = [];

	const traverse = (obj: Changes, path: string[] = []) => {
		for (const [key, value] of Object.entries(obj)) {
			if (value && typeof value === "object") {
				if ("from" in value && "to" in value) {
					changes.push({
						field: [...path, key].join("."),
						change: value as Change,
					});
				} else {
					traverse(value as Changes, [...path, key]);
				}
			}
		}
	};

	traverse(differences);
	return changes;
};

const ChangedInfo = ({ differences }: { differences: Changes }) => {
	const changes = handleNestedObject(differences);
	const { t } = useTranslation();


	return (
		<div className="edit-property">
			<Stack direction="column" spacing={2}>
				{changes.map(({ field, change }, index) => (
					<div key={index} className="edit-property__item">
						<p className="edit-property__title">
							{upperCaseFirstLetter(field)}
						</p>
						<p className="edit-property__old">
							{t("oldVersion")}: {formatValue(change.from)}
						</p>
						<p className="edit-property__new">
							{t("newVersion")}: {formatValue(change.to)}
						</p>
					</div>
				))}
			</Stack>
		</div>
	);
};

export default ChangedInfo;
