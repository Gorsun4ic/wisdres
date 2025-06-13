export default interface File extends Blob {
	readonly lastModified: number;
	readonly name: string;
	readonly webkitRelativePath: string;
	type: string;
}
