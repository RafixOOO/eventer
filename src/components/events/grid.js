import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Logo from './logo.svg';

function GridExample() {
  return (
    <Row xs={1} md={2} className="g-4">
      {Array.from({ length: 16 }).map((_, idx) => (
        <Col key={idx}>
          <Card>
            <Card.Img variant="top" style={{maxheight: '400px'}} src={Logo} className='img-fluid' />
            <Card.Body>
              <Card.Title>Card title</Card.Title>
              <Card.Text>
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default GridExample;