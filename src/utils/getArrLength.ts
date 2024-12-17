export default function getArrLength<T>(arr: T[], subtract?: number): number {
	return subtract ? arr.length - subtract : arr.length;
}
