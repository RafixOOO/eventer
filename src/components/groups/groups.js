import 'bootstrap/dist/css/bootstrap.min.css';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';
import Logo from './logo.svg';
import Nav from 'react-bootstrap/Nav';

function DefaultExample() {
    return (
        <ListGroup as="ol">
            <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
            >
                <Image style={{ maxWidth: '100%', height: 'auto', maxHeight: '25px', }} src={Logo} roundedCircle />
                <div className="ms-2 me-auto">
                    <div className="fw-bold"><Nav.Link href="/groups">Subheading</Nav.Link></div>
                </div>
                <Badge bg="danger" pill>
                    14
                </Badge>
            </ListGroup.Item>
            <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
            >
                <Image style={{ maxWidth: '100%', height: 'auto', maxHeight: '25px', }} src={Logo} roundedCircle />
                <div className="ms-2 me-auto">
                    <div style={{ maxWidth: '100%' }} className="fw-bold"><Nav.Link href="/groups">Subheading</Nav.Link></div>
                </div>
                <Badge bg="danger" pill>
                    14
                </Badge>
            </ListGroup.Item>
            <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
            >
                <Image style={{ maxWidth: '100%', height: 'auto', maxHeight: '25px', }} src={Logo} roundedCircle />
                <div className="ms-2 me-auto">
                    <div className="fw-bold"><Nav.Link href="/groups">Subheading</Nav.Link></div>
                </div>
                <Badge bg="danger" pill>
                    1
                </Badge>
            </ListGroup.Item>
        </ListGroup>
    );
}

export default DefaultExample;