import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Logo from './logo.svg';
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Linkify from 'react-linkify';

function GridExample() {
  const maxTextLength = 200;
  const title = 'Card title';
  const text = `This is a longer card with supporting text below as a natural
lead-in to additional content. This content is a little bit
longer.
This is a longer card with supporting text below as a natural
lead-in to additional content. This content is a little bit
longer.
https://tarkon.pl/
This is a longer card with supporting text below as a natural
lead-in to additional content. This content is a little bit
longer.`;
  
  const truncatedText = text.slice(0, maxTextLength);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const [showModal, setShowModal] = useState(false);

  return (
    <Row xs={1} md={2} className="g-4">
      {Array.from({ length: 16 }).map((_, idx) => (
        <Col key={idx}>
          <Card>
            <Card.Img variant="top" style={{ maxHeight: '400px' }} src={Logo} className='img-fluid' />
            <Card.Body>
              <Card.Title>{title}</Card.Title>
              <Card.Text>
              <Linkify>{truncatedText}</Linkify>
                {!showModal && text.length > maxTextLength && (
                  <span
                    onClick={handleShowModal}
                    style={{ cursor: 'pointer', color: 'blue' }}
                  >
                    ... czytaj więcej
                  </span>
                )}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Card.Img variant="top" style={{ maxHeight: '400px' }} src={Logo} className='img-fluid' />
        <Linkify>{text}</Linkify>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleCloseModal}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </Row>
  );
}

export default GridExample;