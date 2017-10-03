import React, { Component } from 'react';
import { 
  Modal, 
  ModalHeader, 
  ModalBody,
  Row,
  Col
} from 'reactstrap';
import { getUrlForAttachmentFile } from '../../utils';

export default class AttachmentsModal extends Component {
	render() {
		const { title, toggle, show, files } = this.props;
		return (
			<Modal isOpen={show} toggle={toggle} className='attachments'>
				<ModalHeader toggle={toggle}>{title || 'Attachments'}</ModalHeader>
				<ModalBody>
					<Row className='row-eq-height'>
						{ files.map((file, idx) => {
							const url = getUrlForAttachmentFile(file);
							return (
								<Col key={idx} xs={12} sm={6} md={4} className='file-col'>
									<a href={url} target='_blank' rel='nooptions nofollow'>
										{ this.isImage(url) && this.renderImage(url) }
										{ !this.isImage(url) && this.renderFile(url) }
									</a>
								</Col>
							)
						})}
					</Row>
				</ModalBody>
			</Modal>
		)
	}

	isImage = (url) => url.toLowerCase().match(/\.(jpeg|jpg|gif|png)$/) !== null
	getFormat = (url) => url.toLowerCase().match(/.*\.([a-z]+)$/)[1];

	renderImage(url) {
		return (
			<div className='img-preview p16-9' style={{backgroundImage: 'url('+url+')'}}></div>
		);
	}

	renderFile(url) {
		return (
			<div className='file-preview p16-9'>
				<span className='format'>{this.getFormat(url)}</span>
			</div>
		);
	}
}