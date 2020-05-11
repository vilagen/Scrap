import React from 'react';
import { Container, Row, Col, Button,
				 Card, CardImg, CardText, CardBody, CardLink,
				 CardTitle, CardSubtitle } from 'reactstrap';
import './newsContainerstyle.css';

export function NewsCardList({children}) {
  return <ul className="list-group">{children}</ul>
};

const textStyling = {
	fontFamily:' "ZCOOL XiaoWei", "serif"',
  fontSize: "20px",
  color: "black",
  padding: '0px'
};

const titleStyling = {
	fontFamily:' "ZCOOL XiaoWei", "serif"',
  fontSize: "20px",
  color: "white",
  backgroundColor: "black",
  padding: '5px'
};

const cardStyle = {
  width: "325px",
  borderStyle:"solid",
  borderWidth: "thick",
  borderColor: "#cccc00",
};

const centerCard = {
  marginTop: "15px",
	display: "flex",
  flexDirection: "row",
  alignItems: "center",
	justifyContent: "center",
};

const cardImage = {
  padding: '0px',
  width: '95%',
  marginRight: 'auto',
  marginLeft: 'auto'
}

// info will come from a JSON file
export function NewsCardItem({
  author,
  title,
  image,
  description,
  url,
	published,
	allowSave,
	allowDelete,
	onSave,
	onDelete
}) {
	return (

    <div className="showCard" style={centerCard}>

      <Card style={cardStyle}>

        <CardBody style={textStyling}>
        
          <CardTitle style={titleStyling}> {title} </CardTitle>
          
          <CardSubtitle style={{marginBottom:"5px"}}> Author(s): {author} </CardSubtitle>
          
        </CardBody>
        
        <CardImg style={cardImage} src={image} alt="Article" />
        
        <CardBody style={textStyling}>

          <CardBody>{published}</CardBody>

          <CardText>{description}</CardText>
          
          <span>

          <a className="btn btn-primary mx-2 my-2"
          style={{height: "40px"}}
          href={url}>Story</a>

          {allowSave && <Button
            className="mx-1 my-2" 
            onClick={onSave}
            style={{height: "40px"}} 
            color="success" 
            >
            Save
            </Button>	
          }

          {allowDelete && <Button
            className="mx-1 my-2" 
            onClick={onDelete}
            style={{height: "40px"}} 
            color="danger"
          >
            Delete
          </Button>
          }

          </span>
          
        </CardBody>
        
      </Card>

    </div>

  )
}