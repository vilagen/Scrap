import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import './index.css';

export function NewsList({children}) {
  return <ul className="list-group">{children}</ul>
};

// info will come from a JSON file
export function NewsListItem({
  source,
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

		<Container 
		style={{borderStyle:"solid"}}
		className="my-2"
		>

			<div className="my-2 bg-white" id="squareBorder">

				<div className="d-flex justify-content-between"
				style={{backgroundColor:"black"}}>

					<h4 className="mx-1 my-2 text-white">{title}</h4>

					<a className="btn btn-primary mx-1 my-2"
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
						onClick={onDelete}
						color="danger"
						text="Delete"
					/>}
				
				</div>

				<div className="d-flex justify-content-between">

							<p>{author}</p>

							<p>{published}</p>

				</div>
	
				<Row>

					<div id="border"></div>
	
					<Col xs="4" sm="2">
						<img className="imageContainer m-3" src={image} alt=""/>
					</Col>
	
					<Col xs="8" sm="10">
						<p>{description}</p>
					</Col>
	
				</Row>

			</div>

		</Container>
	)
}