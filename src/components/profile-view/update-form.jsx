import { useState } from "react";
import { Button, Form, Card } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../redux/reducers/user';

export const UpdateForm = () => {

  const user = useSelector((state) => state.user.user);
  const token = useSelector(
    (state) => state.token.token || localStorage.getItem('token')
  );
  const dispatch = useDispatch();


  const [username, setUsername] = useState(user.Username);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user.Email);
  const [birthday, setBirthday] = useState(user.Birthday ? new Date(user.Birthday).toISOString().substr(0, 10) : "");

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    };

    console.log(data);

    fetch(
      `https://martalexa-myflix.onrender.com/users/${user.Username}`,
      {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert('Something went wrong');
        }
      })
      .then((data) => {
        if (!data) return;
        dispatch(setUser(data));
        alert("user info updated");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className='d-flex justify-content-center'>
        <Card className='px-4 pt-4 mt-2 shadow border border-white align-items-left flex-center'>
          <Form onSubmit={handleSubmit}>
            <div className='my-2 d-flex align-items-center'>
              <div className='me-3' style={{ minWidth: '100px' }}>
                <Form.Label className='mb-0'>Username:</Form.Label>
              </div>
              <div>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  minLength="3"
                />
              </div>
            </div>
            <div className='my-2 d-flex align-items-center'>
              <div className='me-3' style={{ minWidth: '100px' }}>
                <Form.Label className='mb-0'>Password:</Form.Label>
              </div>
              <div>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className='my-2 d-flex align-items-center'>
              <div className='me-3' style={{ minWidth: '100px' }}>
                <Form.Label className='mb-0'>Email:</Form.Label>
              </div>
              <div>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className='my-2 d-flex align-items-center'>
              <div className='me-3' style={{ minWidth: '100px' }}>
                <Form.Label className='mb-0'>Birthday:</Form.Label>
              </div>
              <div>
                <Form.Control
                  type="date"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className='text-end'>
              <Button variant="primary" type="submit" className='my-4'>
                Update data
              </Button>
            </div>
          </Form>
        </Card>
      </div>
    </>
  );
};