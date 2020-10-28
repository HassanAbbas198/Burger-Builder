import React from 'react';
import PropTypes from 'prop-types';

import classes from './Modal.module.css';

import Backdrop from '../Backdrop/Backdrop';

const Modal = (props) => {
	return (
		<React.Fragment>
			<Backdrop show={props.show} clicked={props.modalClosed} />
			<div
				className={classes.Modal}
				style={{
					transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
					opacity: props.show ? '1' : '0',
				}}
			>
				{props.children}
			</div>
		</React.Fragment>
	);
};

Modal.prototype = {
	show: PropTypes.bool.isRequired,
	modalClosed: PropTypes.func.isRequired,
	children: PropTypes.node,
};

export default React.memo(
	Modal,
	(prevProps, nextProps) =>
		nextProps.show === prevProps.show &&
		nextProps.children === prevProps.children
);
