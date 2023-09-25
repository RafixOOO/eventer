import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

function TextControlsExample() {
  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Group Name</Form.Label>
        <Form.Control type="text" />
      </Form.Group>
      <Button variant="primary">Search</Button>
    </Form>
  );
}

export default TextControlsExample;