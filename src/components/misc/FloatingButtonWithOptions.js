import React, { Component } from 'react';
import { Button } from 'reactstrap';

export default class FloatingButtonWithOptions extends Component {
	componentDidMount() {
		document.addEventListener( 'mouseup', this.clickOutside );
	}
	componentWillUnmount() {
		document.removeEventListener( 'mouseup', this.clickOutside );
	}
	clickOutside = ( event ) => {
		if ( !this.props.open ) return; // shortcut

		let target = event.target;

		if ( target.tagName !== 'HTML' ) {
			while ( target.tagName !== 'BUTTON' ) {
				target = target.parentElement;
				if ( target.tagName === 'DIV' ) break; // shortcut
			}
		}

		if ( target.id === 'floating-btn' ) return;
		this.props.toggle();
	}
	render() {
		const { className, options, toggle, open, ...props } = this.props;
		return (
			<div className={`floating-btn with-options ${open ? 'opened' : 'closed'}`}>
				<Button id='floating-btn'
					ref={( e ) => this.elem = e} 
					{...props} 
					className={`${className || ''}`} onClick={toggle} 
				/>
				<div className='options'>
					{ Object.keys( options ).map( ( oKey, idx ) => {
						return <Button key={idx} onClick={options[oKey]}>{oKey}</Button>;
					} ) }
				</div>
			</div>
		);
	}
} 
	

