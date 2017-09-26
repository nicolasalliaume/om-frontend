import React from 'react';

export default function Tag(props) {
	const { className, children, ..._props } = props;
	const clazz ='tag ' + (className || '');
	return (
		<span className={clazz} {..._props}>
			{ children }
		</span> 
	)
	
}
	