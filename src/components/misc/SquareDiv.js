import React from 'react';

export default function SquareDiv({ children, ...props }) {
	return (
		<div className='square' {...props}>
			<div className='square-inner'>{children}</div>
		</div>
	)
}