import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../../store/actions/user.action';
import { Table, Row, Col, Card, Alert, Form } from 'react-bootstrap';
import './Home.css';
// { subject:subject, message:message, recipients:recipients, attachment:attachment }
const Home = () => {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.userDetail.user_data);
  const isLoading = useSelector(state => state.userDetail.loading);
  const error = useSelector(state => state.userDetail.error);

  useEffect(() => {
    dispatch(userActions.getUserData());
  }, [dispatch]);

  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleCheckboxChange = (id) => {
    setSelectedUsers(prevSelected => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter(userId => userId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  const handleSelectAllCheckboxChange = () => {
    if (selectedUsers.length === userData.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(userData.map(user => user.id));
    }
  };

  const handleSendMail = () => {
    console.log('Send email to selected users:', selectedUsers);
  };

  return (
    <div className="container mt-4">
      {/* <h1>Home page</h1> */}
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <>
          {userData && userData.length > 0 ? (
            <>
              <div className="top-section">
                <h2>Send email</h2>
                <button
                  className="btn btn-sm btn-info"
                  onClick={handleSendMail}
                  disabled={selectedUsers.length === 0} 
                >
                  Send Mail
                </button>
              </div>
              <Row>
                <Col>
                  <Table striped bordered hover responsive className="custom-table">
                    <thead>
                      <tr>
                        <th>
                          <Form.Check
                            type="checkbox"
                            checked={selectedUsers.length === userData.length}
                            onChange={handleSelectAllCheckboxChange}
                          />
                        </th>
                        <th>Username</th>
                        <th>Email</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userData.map(item => (
                        <tr key={item.id}>
                          <td>
                            <Form.Check
                              type="checkbox"
                              checked={selectedUsers.includes(item.id)}
                              onChange={() => handleCheckboxChange(item.id)}
                            />
                          </td>
                          <td>{item.username}</td>
                          <td>{item.email}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </>
          ) : (
            <p>No data available</p>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
