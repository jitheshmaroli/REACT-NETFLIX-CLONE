import Card from 'react-bootstrap/Card';
import './Cards.css'

function Cards({title, text}) {
  return (
    <Card className='card-container'>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {text}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Cards;