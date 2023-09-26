import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import Adduser from './adduser';

function ResponsiveExample() {
  return (
    <Table responsive>
      <thead>
        <tr>
            <th>Name</th>
            <th>Admin</th>
            <th>Manager</th>
            <th>Events adder</th>
            <th>Chat writer</th>
        </tr>
      </thead>
      <tbody>
        <tr>
            <td >Jan Kowalski </td>
            <td ><Button variant='success'></Button>  </td>
            <td ><Button variant='danger'></Button> </td>
            <td ><Button variant='danger'></Button>  </td>
            <td ><Button variant='danger'></Button>  </td>
        </tr>
        <tr>
            <td >Jan Kowalski </td>
            <td ><Button variant='danger'></Button>  </td>
            <td ><Button variant='danger'></Button> </td>
            <td ><Button variant='danger'></Button>  </td>
            <td ><Button variant='danger'></Button>  </td>
        </tr>
        <tr>
            <td >Jan Kowalski </td>
            <td ><Button variant='danger'></Button>  </td>
            <td ><Button variant='danger'></Button> </td>
            <td ><Button variant='danger'></Button>  </td>
            <td ><Button variant='danger'></Button>  </td>
        </tr>
        <tr>
            <td >Jan Kowalski </td>
            <td ><Button variant='danger'></Button>  </td>
            <td ><Button variant='danger'></Button> </td>
            <td ><Button variant='danger'></Button>  </td>
            <td ><Button variant='danger'></Button>  </td>
        </tr>
      </tbody>
      <Adduser />
    </Table>
  );
}

export default ResponsiveExample;