import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { connect } from "react-redux";

class GenericModal extends React.Component {
    constructor() {
        super();
        this.handlePositiveClose = this.handlePositiveClose.bind(this);
        this.handleNegativeClose = this.handleNegativeClose.bind(this);
        this.handleOnHide = this.handleOnHide.bind(this);
    }
    componentWillMount() {
    }

    handlePositiveClose() {
        this.props.modalPositiveButtonCallback();
    }
    handleNegativeClose() {
        this.props.modalNegativeButtonCallback();
    }

    handleOnHide() {
        this.props.modalOnHideCallback();
    }

    render() {
        const {
            modalShow,
            modalTitle,
            modalDescription,
            modalNegativeButton,
            modalPositiveButton,
            singleButton,
        } = this.props;

        let modalDescriptionValidated;
        if (typeof modalDescription !== 'object') {
            modalDescriptionValidated = modalDescription;
        } else {
            modalDescriptionValidated = 'Unknown Error';
            console.log('UNKNOWN EXCEPTION');
            console.log(modalDescription);
            console.log('MODAL NAME');
            console.log(modalTitle);
        }
        return (
            <div>
                <Modal show={modalShow} onHide={this.handleOnHide}>
                    <Modal.Header closeButton>
                        <Modal.Title>{modalTitle}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{modalDescriptionValidated}</Modal.Body>
                    <Modal.Footer>
                        {!singleButton ? <Button variant="secondary" onClick={this.handleNegativeClose}>
                            {modalNegativeButton}
                        </Button> : null}
                        <Button variant="primary" onClick={this.handlePositiveClose}>
                            {modalPositiveButton}
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}


export default connect(
    null, null)(GenericModal);

