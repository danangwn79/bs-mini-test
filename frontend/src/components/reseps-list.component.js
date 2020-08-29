import React, { Component } from 'react';
import { Row, Col, Card, Container } from 'react-bootstrap';
//import { Link } from 'react-router-dom';
import axios from 'axios';

const Resep = props => (
	// <tr>
	// 	<td>{props.resep.nama}</td>
	// 	<td>{props.resep.deskripsi}</td>
	// 	<td>{props.resep.gambar}</td>
	// 	<td>
	// 		<Link to={"/edit/" + props.resep._id}>edit</Link> | <a href="#" onClick={() => { props.deleteResep(props.resep._id) }}>delete</a>
	// 	</td>
	// </tr>
	<Col md={6} xs={12}>
		<Card border="light" >
			<Card.Img src={props.resep.gambar}/>
			<Card.Body>
				<Card.Title>{props.resep.nama}</Card.Title>
				<Card.Text>
					{props.resep.deskripsi}
				</Card.Text>
			</Card.Body>
		</Card>
	</Col>
)

export default class ResepsList extends Component {
	constructor(props) {
		super(props);
		this.deleteResep = this.deleteResep.bind(this);
		this.state = { reseps: [] };
	}

	componentDidMount() {
		axios.get('http://localhost:5000/reseps/')
			.then(response => {
				this.setState({ reseps: response.data });
			})
			.catch((error) => {
				console.log(error);
			})
	}

	deleteResep(id) {
		axios.delete('http://localhost:5000/reseps/' + id)
			.then(res => console.log(res.data));

		this.setState({
			reseps: this.state.reseps.filter(el => el._id !== id)
		})
	}

	resepList() {
		return this.state.reseps.map(currentresep => {
			return <Resep resep={currentresep} deleteResep={this.deleteResep} key={currentresep._id} />;
		})
	}

	render() {
		return (
			<div>
				<h3>Kumpulan Resep</h3>
				{/* <table className="table">
					<thead className="thead-light">
						<tr>
							<th>Nama</th>
							<th>Deskripsi</th>
							<th>Gambar</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{this.resepList()}
					</tbody>
				</table> */}
				<Container>
					<Row>
						{this.resepList()}
					</Row>
				</Container>

			</div>
		);
	}
}