//back-end endpoint to delete user from the database app.delete('/users/:Username')

import { Button } from 'react-bootstrap';

export const DeleteUser = ({ storedToken, storedUser }) => {
  
  const handleDeregister = (username) => {
    const userWarning = confirm(
      `You are going to delete your account. All information will be lost and cannot be recovered. Are you sure?`
    );

    userWarning === false
      ? alert('Great decision. Keep choosing your favorite movies')
      : fetch(
          `https://martalexa-myflix.onrender.com/users/${username}`,
          {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${storedToken}`,
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
      <div>
        <Button
          onClick={() => handleDeregister(storedUser.Username)}
          className='delete-button'
          variant='danger'
        >
          Delete Account
        </Button>
      </div>
  );
};