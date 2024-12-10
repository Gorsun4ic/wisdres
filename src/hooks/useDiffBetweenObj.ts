type Difference<T> = {
	[K in keyof T]?: {
		from: T[K];
		to: T[K];
	};
};


export const useFindDifference = <T extends object>(
	obj1: T,
	obj2: T
): Difference<T> => {
	if (obj1 && obj2) {
		return (Object.keys(obj1) as Array<keyof T>).reduce((differences, key) => {
			if (obj1[key] !== obj2[key]) {
				differences[key] = { from: obj1[key], to: obj2[key] };
			}
			return differences;
		}, {} as Difference<T>);
	}
	return {};
};