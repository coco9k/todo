import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Container, Row, Col, Table, Button, Modal, Form, ListGroup } from "react-bootstrap"
import { ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im'
import { ThemeProvider } from "styled-components"
import { lightTheme, darkTheme, GlobalStyles } from "../constants/theme"
import { Switch } from "antd"
import Swal from 'sweetalert2'
import DatePicker from "react-datepicker"
import './css/todo.css'
import "react-datepicker/dist/react-datepicker.css"

export const Todo = () => {
    //Switch Toggle
    const [theme, setTheme] = useState("light")
    const [toggle, setToggle] = useState(false)
    //Show Todo-Lists
    const [Lists, setLists] = useState([])
    const [rowItem, setRowitem] = useState([])
    const [id, setId] = useState("");
    //Create Todo-Lists
    const [title, setTitle] = useState("")
    const [detail, setDetail] = useState("")
    const [date, setDate] = React.useState(new Date())
    const [check, setCheck] = useState(false)
    //Create Model
    const [create, setCreate] = useState(false)
    const handleCreateClose = () => setCreate(false)
    const handleCreateShow = () => setCreate(true)
    //Edit Todo-Lists
    const [titleEdit, setTitleEdit] = useState("")
    const [detailEdit, setDetailEdit] = useState("")
    const [dateEdit, setDateEdit] = React.useState(new Date())
    const [checkEdit, setCheckEdit] = useState(false)
    //Edit Model
    const [edit, setEdit] = useState(false)
    const handleEditClose = () => setEdit(false)
    const handleEditShow = () => setEdit(true)

    const [validated, setValidated] = useState(false);

    const handleSubmitCreate = (event) => {
        const form = event.currentTarget
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
        } else {
            event.preventDefault()
            createTodo()
        }
        setValidated(true)
    }

    const handleSubmitEdit = (event) => {
        const form = event.currentTarget
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
        } else {
            event.preventDefault()
            editTodo()
        }
        setValidated(true)
    }

    const themeToggler = () => {
        theme === "light" ? setTheme("dark") : setTheme("light")
        toggle ? setToggle(false) : setToggle(true)
    }

    useEffect(() => {
        setTitleEdit(rowItem.title)
        setDetailEdit(rowItem.detail)
        setDateEdit(rowItem.date ? new Date(rowItem.date) : new Date())
        setCheckEdit(rowItem.check)
    }, [rowItem])

    useEffect(() => {
        ListsGet()
    }, [])

    const ListsGet = () => {
        fetch("http://localhost:3333/todo")
            .then(res => res.json())
            .then((result) => {
                setLists(result)
            }
            )
    }

    const createTodo = (req, res) => {
        var myHeaders = new Headers()
        myHeaders.append("Content-Type", "application/json")
        date.setHours(date.getHours() + 7)
        var raw = JSON.stringify({
            "id": uuidv4(),
            "title": title,
            "detail": detail,
            "date": date,
            "check": check
        })

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        }

        fetch("http://localhost:3333/todo/create", requestOptions)
            .then(result => {
                if (result.status === 200) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Create post successfully.',
                        icon: 'success'
                    }).then(function () {
                        window.location.reload(false)
                    })
                }
            })
            .catch(error => console.log('error', error))
    }

    const editTodo = (req, res) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json")
        var raw = JSON.stringify({
            "id": id,
            "title": titleEdit,
            "detail": detailEdit,
            "date": dateEdit,
            "check": checkEdit
        })

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        }

        fetch("http://localhost:3333/todo/update", requestOptions)
            .then(result => {
                if (result.status === 200) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Update post successfully.',
                        icon: 'success'
                    }).then(function () {
                        window.location.reload(false)
                    })
                }
            })
            .catch(error => console.log('error', error));
    }

    const deleteTodo = id => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#7066e0',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                var myHeaders = new Headers()
                myHeaders.append("Content-Type", "application/json")

                var raw = JSON.stringify({
                    "id": id
                })

                var requestOptions = {
                    method: 'DELETE',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                }

                fetch("http://localhost:3333/todo/delete", requestOptions)
                    .then(response => response.text())
                    .then((result) => {
                        ListsGet()
                    })
                    .catch(error => console.log('error', error))
                Swal.fire(
                    'Deleted!',
                    'Todo-List has been deleted.',
                    'success'
                )
            }
        })
    }

    return (
        <>
            {/* Show End */}
            <div className='table'>
                <h1 className='title'>Todo-Lists</h1>
                <Container>
                    <Row>
                        <Col className='col-switch'>
                            <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
                                <GlobalStyles />
                                <Switch onClick={() => themeToggler()} />
                                {toggle ? <span className=''>Dark Mode</span> : <span>Light Mode</span>}
                            </ThemeProvider>
                        </Col>
                        <Col className='col-btn-create'>
                            <Button className="btn-create" variant="primary" onClick={handleCreateShow}>Create</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Table bordered style={{ width: '100%' }}>
                                <thead>
                                    <tr>
                                        <th style={{ width: '5%' }}>Status</th>
                                        <th style={{ width: '25%' }}>Title</th>
                                        <th style={{ width: '25%' }}>Detail</th>
                                        <th style={{ width: '10%' }}>End date</th>
                                        <th style={{ width: '15%' }}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Lists.map((item) =>
                                        <tr key={item.id}>
                                            <td>
                                                {(() => {
                                                    if (item.check === true) {
                                                        return (
                                                            <ImCheckboxChecked color="green" fontSize="1.5em" />
                                                        )
                                                    } else {
                                                        return (
                                                            <ImCheckboxUnchecked color="gray" fontSize="1.5em" />
                                                        )
                                                    }
                                                })()}
                                            </td>
                                            <td>{item.title}</td>
                                            <td>{item.detail}</td>
                                            <td>
                                                {new Date(item.date).toLocaleDateString('de-DE')}
                                            </td>
                                            <td>
                                                <Button
                                                    className="btn-edit"
                                                    variant="primary"
                                                    onClick={() => { handleEditShow(setRowitem(item), setId(item.id)) }}>
                                                    Edit
                                                </Button>
                                                &nbsp;
                                                <Button
                                                    className="btn-delete"
                                                    variant="danger"
                                                    onClick={() => deleteTodo(item.id)}>
                                                    Delete
                                                </Button>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container>
            </div>
            {/* Show End */}

            {/* Create Start */}
            <Modal show={create} onHide={handleCreateClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Todo List</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated} onSubmit={handleSubmitCreate}>
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Title"
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid title.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Detail</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                onChange={(e) => setDetail(e.target.value)}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid detail.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>End Date</Form.Label>
                            <DatePicker
                                className='select-date'
                                selected={date}
                                onChange={date => setDate(date)}
                                dateFormat="dd/MM/yyyy"
                                minDate={new Date()}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Status</Form.Label>
                            <Form.Check
                                type="checkbox"
                                label="Successful"
                                onChange={(e) => setCheck(true)}
                            />
                        </Form.Group>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCreateClose}>Close</Button>
                            {/* <Button variant="primary" onClick={createTodo}>Save</Button> */}
                            <Button variant="primary" type='submit'>Save</Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
            {/* Create End */}

            {/* Edit Start */}
            <Modal show={edit} onHide={handleEditClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Todo List</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated} onSubmit={handleSubmitEdit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Title"
                                onChange={(e) => setTitleEdit(e.target.value)}
                                defaultValue={rowItem.title}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid title.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Detail</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                onChange={(e) => setDetailEdit(e.target.value)}
                                defaultValue={rowItem.detail}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid detail.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>End Date</Form.Label>
                            <DatePicker
                                className='select-date'
                                selected={dateEdit}
                                onChange={dateEdit => setDateEdit(dateEdit)}
                                dateFormat="dd/MM/yyyy"
                                minDate={dateEdit}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Label>Status</Form.Label>
                            {(() => {
                                if (rowItem.check === true) {
                                    return (
                                        <ListGroup>
                                            <ListGroup.Item variant="success">
                                                Done
                                            </ListGroup.Item>
                                        </ListGroup>
                                    )
                                } else {
                                    return (
                                        <Form.Check
                                            type="checkbox"
                                            label="Successful"
                                            onChange={(e) => setCheckEdit(true)}
                                        />
                                    )
                                }
                            })()}
                        </Form.Group>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleEditClose}>Close</Button>
                            <Button variant="primary" type='submit'>Save</Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
            {/* Edit End */}
        </>
    )
}