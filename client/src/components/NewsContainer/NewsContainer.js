import React from 'react';
import { Container, Row, Col, Button, } from 'reactstrap';
import './newsContainerstyle.css';

export function NewsList({children}) {
  return <ul className="list-group">{children}</ul>
};
const textStyling = {
	fontFamily:' "ZCOOL XiaoWei", "serif"',
  fontSize: "20px",
  color: "black",
};

const borderStyle = {
	borderStyle:"solid",
	borderColor: "#cccc00",
};

// const centerCard = {
// 	display: "flex",
//   flexDirection: "row",
//   alignItems: "center",
// 	justifyContent: "center",
// }

// info will come from a JSON file
export function NewsListItem({
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

		<div className="showCard">

			<Container className="my-2 showContainer">

				<div 
				className="my-2 bg-white"
				style={borderStyle}
				>

					<div className="d-flex justify-content-between"
					style={{backgroundColor:"black"}}>

						<h4 className="ml-2 my-2 text-white" style={{maxWidth:"850px"}}>{title}</h4>

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
					
					</div>
		
					<Row>

						<div id="border"></div>
		
						<Col xs="4" sm="2">
							<img className="imageContainer m-3" src={image} alt="Article"/>
						</Col>
		
						<Col xs="8" sm="10">
						<span className="d-flex justify-content-between">

						<p className="mx-2" style={textStyling}> Author(s): {author} </p>

						<p className="mx-2" style={textStyling}> Published by: {published} </p>

							</span>

							<p>{description}</p>
						</Col>
		
					</Row>

				</div>

			</Container>
			
		</div>

	)
}

// <div className="showCard" style={centerCard}>

// <Card style={{width:'310px'}}>

// 	<CardBody>
	
// 		<CardTitle> {title} </CardTitle>
		
// 		<CardSubtitle> Author(s): {author} </CardSubtitle>
		
// 	</CardBody>
	
// 	<CardImg width="300" height="auto" src={image} alt="Article" />
	
// 	<CardBody>

// 		<CardText>{description}</CardText>
		
// 		{allowSave && <CardLink 
// 			onClick={onSave}
// 			// color="success" 
// 		>
// 			Save
// 		</CardLink>}

// 		<CardLink 
// 			href={url}
// 		>
// 			Story
// 		</CardLink>
		
// 	</CardBody>
	
// </Card>

// </div>