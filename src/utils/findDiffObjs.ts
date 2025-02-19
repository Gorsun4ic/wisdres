export type Difference<T> = {
	[K in keyof T]?: T[K] extends object
		? Difference<T[K]> | { from: T[K]; to: T[K] }
		: { from: T[K]; to: T[K] };
};

export const findDifferenceObjs = <T extends object>(
	obj1: T,
	obj2: T
): Difference<T> => {
	if (!obj1 || !obj2) return {} as Difference<T>;

	console.log("obj1", obj1);
	console.log("obj2", obj2);

	const allKeys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]) as Set<
		keyof T
	>;

	return [...allKeys].reduce((differences, key) => {
		const val1 = obj1[key];
		const val2 = obj2[key];

		if (typeof val1 === "object" && typeof val2 === "object" && val1 && val2) {
			// Recursively check nested objects
			const nestedDiff = findDifferenceObjs(val1, val2);
			console.log("nestedDiff", nestedDiff);
			if (Object.keys(nestedDiff).length) {
				differences[key] = nestedDiff;
			}
		} else if (val1 !== val2) {
			differences[key] = { from: val1, to: val2 };
		}

		return differences;
	}, {} as Difference<T>);
};

