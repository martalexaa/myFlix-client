import placeholder from './Portrait_Placeholder.png';

export const ProfileImage = () => {
  return (
    <div>
      <img src={placeholder} alt="profile" 
      className="rounded float-left img-thumbnail shadow m-2" style={{ width: '200px', height: '200px'}}></img>
    </div>
  )
}

