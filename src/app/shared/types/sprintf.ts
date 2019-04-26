export default function sprintf( strings: TemplateStringsArray, ...indices: number[] ) {
	return ( ...values: string[] ) =>
		strings.reduce( ( total, part, index ) =>
			total + part + ( values[ indices[ index ] ] || '' ), ''
		);
}