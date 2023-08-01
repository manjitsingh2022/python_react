import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { emailActions } from '../../../store/actions/email.action'; 
import './SendMail.css';
import { userActions } from '../../../store/actions/user.action';
import Select from 'react-select'; 
 
const SendMail = () => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [recipientInput, setRecipientInput] = useState('');
  const [recipients, setRecipients] = useState([]);
  const [attachment, setAttachment] = useState(null);
  const dispatch = useDispatch();
  const userData = useSelector(state => state.userDetail.user_data);

  const handleSendEmail = async (e) => {
    e.preventDefault();
    try {
      const recipientEmails = recipients.map(recipient => recipient.value);
      dispatch(emailActions.sendEmailData({ subject, message, recipients: recipientEmails, attachment })); 
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAttachment(file);
  };

  const handleAddRecipient = (e) => {
    e.preventDefault();
    if (recipientInput.trim() !== '') {
      const newRecipient = { value: recipientInput.trim(), label: recipientInput.trim() };
      setRecipients([...recipients, newRecipient]);
      setRecipientInput('');
    }
  };
  const handleRecipientChange = (selectedOptions) => {
    const selectAllOption = selectedOptions.find(option => option.value === 'selectAll');
    if (selectAllOption) {
      const allRecipients = recipientOptions.filter(option => option.value !== 'selectAll');
      setRecipients(allRecipients);
    } else {
      setRecipients(selectedOptions);
    }
  };
  useEffect(() => {
    dispatch(userActions.getUserData());
  }, [dispatch]);

  const recipientOptions = userData && userData ? [{ value: 'selectAll', label: 'Select All' }, ...userData.map(user => ({ value: user.email, label: user.email }))] : [];

  return (
    <div className="send-mail">
      <h1>Send Email</h1>
      <Form>
        <Form.Group controlId="subject">
          <Form.Label>Subject:</Form.Label>
          <Form.Control
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="message">
          <Form.Label>Message:</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="recipients">
          <Form.Label>Recipients (comma-separated):</Form.Label>
          <>
            <Select
              isMulti
              options={recipientOptions}
              onChange={handleRecipientChange}
              value={recipients}
              placeholder="Select recipients"
            />
            <div className="recipients-list">
              {recipients && recipients.map((recipient, index) => (
                <div key={index}>{recipient.label}</div>
              ))}
            </div>
            <div className="recipient-input">
              <Form.Control
                type="email"
                placeholder="Enter recipient email"
                value={recipientInput}
                onChange={(e) => setRecipientInput(e.target.value)}
              />
              <Button variant="secondary" onClick={handleAddRecipient}>
                Add Recipient
              </Button>
            </div>
          </>
        </Form.Group>
        <Form.Group controlId="attachment">
          <Form.Label>Attachment:</Form.Label>
          <Form.Control
            type="file"
            onChange={handleFileChange}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleSendEmail}>
          Send
        </Button>
      </Form>
    </div>
  );
};

export default SendMail;
