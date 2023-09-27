import 'bootstrap/dist/css/bootstrap.min.css';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';
import Nav from 'react-bootstrap/Nav';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function DefaultExample() {
    const [Email, setEmail] = useState('');
    const [data, setData] = useState([]);
    const [image, setImage] = useState('');

    useEffect(() => {
        // Wywołaj pobieranie danych użytkownika po zalogowaniu
        axios.get('http://localhost:8080/api/User/Current', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem('authdata')}`,
            },
        })
            .then(response => {
                const responseData = response.data;
                setEmail(responseData.email)
            })
            .catch(error => {
                console.error(error);
                sessionStorage.removeItem('authdata');
            });
    }, []);

    useEffect(() => {
        // Wywołaj pobieranie danych użytkownika po zalogowaniu
        axios.get(`http://localhost:8080/api/KoloUser/FindByUser?Person=${Email}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem('authdata')}`,
            },
        })
            .then(response => {
                const responseData = response.data;
                setData(responseData);
            })
            .catch(error => {
                console.error(error);
                sessionStorage.removeItem('authdata');
            });
    }, [Email]);

    const dowima = (obrazek) => {
        axios.get(`http://localhost:8080/api/Image/download/${obrazek}`, {
            headers: {
                Accept: 'application/octet-stream',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem('authdata')}`,
            },
            responseType: 'blob',
        })
            .then((response) => {
                const blob = new Blob([response.data], { type: 'image/jpeg' });
                setImage(URL.createObjectURL(blob));
            })
            .catch((error) => {
                console.error(error);
            });

            return image;
    }

    return (
        <>
            <ListGroup as="ol">
                {data.map(item => (
                    <ListGroup.Item
                    
                        as="li"
                        key={item.koloIdKola.id}
                        className="d-flex justify-content-between align-items-start"
                    >
                        
                        <Image
                            style={{ maxWidth: '100%', height: 'auto', maxHeight: '25px' }}
                            src={dowima(item.koloIdKola.image)}
                            roundedCircle
                        />
                        <div className="ms-2 me-auto">
                            <div className="fw-bold"><Nav.Link href="/groups">{item.koloIdKola.nazwa}</Nav.Link></div>
                        </div>
                        <Badge bg="danger" pill>
                            {item.badges}
                        </Badge>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </>
    );
}

export default DefaultExample;
