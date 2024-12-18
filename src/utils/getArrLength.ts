export default function getArrLength<T>(arr: T[], subtract?: number): number {
	if(!arr || arr.length === 0 || !Array.isArray(arr)) return 0 

	return subtract ? arr?.length - subtract : arr?.length;
}
