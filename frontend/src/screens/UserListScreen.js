import React, { useState, useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listUsers, deleteUser } from '../actions/userActions';
import Meta from '../components/Meta';

const UserListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.JMBG) {
      dispatch(listUsers());
    } else {
      history.push('/login');
    }
  }, [dispatch, history, successDelete, userInfo]);

  const deleteHandler = (id) => {
    handleClose();
    dispatch(deleteUser(id));
  };

  return (
    <>
      <Meta title='All Users' />
      <h1>Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr style={{ background: 'rgb(247,221,220)' }}>
              <th>USER ID</th>
              <th>FIRST NAME</th>
              <th>LAST NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td
                  style={{ 'text-align': 'center', 'vertical-align': 'middle' }}
                >
                  {user.JMBG ? (
                    <i className='fas fa-check' style={{ color: 'green ' }}></i>
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => handleShow}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                  {show === true && (
                    <Modal show={show} onHide={handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>
                          You are about to delete user account!
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        Are you sure you want to delete this user?
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant='secondary' onClick={handleClose}>
                          Close
                        </Button>
                        <Button
                          variant='primary'
                          onClick={() => deleteHandler(user._id)}
                        >
                          Confirm
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UserListScreen;
