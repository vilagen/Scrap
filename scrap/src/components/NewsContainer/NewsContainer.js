import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import './index.css';

export function NewsList({children}) {
  return <ul className="list-group">{children}</ul>
};

const textStyling = {
	fontFamily:' "ZCOOL XiaoWei", "serif"',
  fontSize: "20px",
  color: "black",
}

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

					<h4 className="ml-2 my-2 text-white" style={{maxWidth:"850px"}}>{title}</h4>

					<span>

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

					</span>
				
				</div>

				<span className="d-flex justify-content-between">

							<p className="mx-2" style={textStyling}> Author(s) {author} </p>

							<p className="mx-2" style={textStyling}> Published by: {published} </p>

				</span>
	
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