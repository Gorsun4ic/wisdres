export type Difference<T> = {
	[K in keyof T]?: T[K] extends readonly unknown[]
		? { from: T[K]; to: T[K] }
		: T[K] extends object
		? Difference<T[K]> | { from: T[K]; to: T[K] }
		: { from: T[K]; to: T[K] };
};

export const findDifferenceObjs = <T extends Record<string, unknown>>(
	obj1: T,
	obj2: T
): Difference<T> => {
	const allKeys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]) as Set<
		keyof T
	>;

	const result: Partial<Difference<T>> = {};

	for (const key of allKeys) {
		const val1 = obj1[key];
		const val2 = obj2[key];

		if (
			val1 !== null &&
			val2 !== null &&
			typeof val1 === "object" &&
			typeof val2 === "object" &&
			!Array.isArray(val1) &&
			!Array.isArray(val2)
		) {
			const nested = findDifferenceObjs(
				val1 as Record<string, unknown>,
				val2 as Record<string, unknown>
			);
			if (Object.keys(nested).length > 0) {
				result[key] = nested as Difference<T>[typeof key];
			}
		} else if (val1 !== val2) {
			result[key] = { from: val1, to: val2 } as Difference<T>[typeof key];
		}
	}

	return result as Difference<T>;
};
