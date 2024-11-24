export default function useGetAmount<T>(arr: T[], subtract?: number): number {
	return subtract? arr.length - subtract : arr.length;
}