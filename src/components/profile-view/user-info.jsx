import { Card } from "react-bootstrap"

export const UserInfo = (user) => {
    return (
    <Card>
    <Card.Title>My profile</Card.Title>
      <Card.Text>Username: {user.Username}</Card.Text>
      <Card.Text>Email: {user.Email} </Card.Text>
      <Card.Text>Birthday: {user.Birthday}</Card.Text>
    </Card>
)};