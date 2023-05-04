import { Button, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';

export const DeleteUser = () => {

  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.token.token);

  const handleDeregister = () => {
    const userWarning = confirm(
      `You are going to delete your account. All information will be lost and cannot be recovered. Are you sure?`
    );

    userWarning === false
      ? alert('Great decision. Keep choosing your favorite movies')
      : fetch(
        `https://martalexa-myflix.onrender.com/users/${user.Username}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      )
        .then((response) => {
          if (response.ok) {
            alert('Account successfully deleted');
            localStorage.clear();
            window.location.reload();
          } else {
            alert('Something went wrong');
          }
        })
        .catch((e) => console.log(e));
  };

  return (
    <>
      <Col>
        <Row>
          <h6 className='mt-5 mb-2'>You no longer want to be registered for the Top Rated Movies?</h6>
          <Button
            onClick={() => handleDeregister(user.Username)}
            className='delete-button mb-5'
            variant='danger'
          >
            Delete Account
          </Button>
        </Row>
      </Col>
    </>
  );
};