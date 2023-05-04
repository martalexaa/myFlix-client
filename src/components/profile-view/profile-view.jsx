import { UpdateForm } from './update-form';
import { DeleteUser } from './delete-user';
import { FavoriteMovies } from './favorite-movies';
import { useSelector } from 'react-redux';

export const ProfileView = () => {

  const user = useSelector((state) => state.user.user);

  return (
    <>
      <h1 className='text-center mb-4' >Hello {user.Username}!</h1>
      <UpdateForm />
      <FavoriteMovies />
      <DeleteUser />
    </>
  );
};