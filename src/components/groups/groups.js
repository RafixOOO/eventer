import 'bootstrap/dist/css/bootstrap.min.css';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';
import Nav from 'react-bootstrap/Nav';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import JSZip from 'jszip';

function DefaultExample() {
    const [Email, setEmail] = useState('');
    const [data, setData] = useState([]);
    const [imageUrls, setImageUrls] = useState({});
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

            });
    }, [Email]);

    useEffect(() => {
        // Pobierz i zaktualizuj obrazy dla każdego elementu w danych
        const imageNames = data.map((item) => item.koloIdKola.image);
        // Sprawdź, czy obraz został już pobrany
        axios
            .get(`http://localhost:8080/api/Image/download`, {
                headers: {
                    Accept: 'application/octet-stream',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${sessionStorage.getItem('authdata')}`,
                },
                responseType: 'blob',
                params: {
                    fileNames: imageNames.join(',')
                }
            })
            .then((response) => {
                // Rozpakuj plik ZIP i uzyskaj listę nazw obrazków
                const zipData = response.data;
                const jszip = new JSZip();

                return jszip.loadAsync(zipData);
            })
            .then((zip) => {

                zip.forEach((relativePath, file) => { // Pomijamy foldery w archiwum
                        file.async('blob').then((blob) => {
                            const imageUrl = URL.createObjectURL(blob);
                            setImageUrls((prevImageUrls) => ({
                                ...prevImageUrls,
                                [relativePath]: imageUrl,
                            }));
                        });
                    
                });
                // Aktualizuj stan z przyporządkowaniem obrazków
            })
            .catch((error) => {
                console.error(error);

            });

    }, [data]);
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
                            src={imageUrls[item.koloIdKola.image]}
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
