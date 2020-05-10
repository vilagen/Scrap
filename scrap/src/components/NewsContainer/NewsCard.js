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
  width: '90%',
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
        
          <CardTitle> {title} </CardTitle>
          
          <CardSubtitle> Author(s): {author} </CardSubtitle>
          
        </CardBody>
        
        <CardImg style={cardImage} src={image} alt="Article" />
        
        <CardBody style={textStyling}>

          <CardBody>{published}</CardBody>

          <CardText>{description}</CardText>
          
          {allowSave && <CardLink 
            onClick={onSave}
            // color="success" 
          >
            Save
          </CardLink>}

          <CardLink 
            href={url}
          >
            Story
          </CardLink>
          
        </CardBody>
        
      </Card>

    </div>

  )
}