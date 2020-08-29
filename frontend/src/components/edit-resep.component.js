import React, { Component } from 'react';
import axios from 'axios';

export default class EditResep extends Component {
    constructor(props) {
        super(props);

        this.onChangeNama = this.onChangeNama.bind(this);
        this.onChangeDeskripsi = this.onChangeDeskripsi.bind(this);
        this.onChangeGambar = this.onChangeGambar.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            nama: '',
            deskripsi: '',
            gambar: '',
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/reseps/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    nama: response.data.nama,
                    deskripsi: response.data.deskripsi,
                    gambar: response.data.gambar,
                    date: new Date(response.data.date)
                })
            })
            .catch(function (error) {
                console.log(error);
            })      
    }

    onChangeNama(e) {
        this.setState({
            nama: e.target.value
        });
    }

    onChangeDeskripsi(e) {
        this.setState({
            deskripsi: e.target.value
        });
    }

    onChangeGambar(e) {
        this.setState({
            gambar: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const resep = {
            nama: this.state.nama,
            deskripsi: this.state.deskripsi,
            gambar: this.state.gambar,
        };

        console.log(resep);

        axios.post('http://localhost:5000/reseps/update/' + this.props.match.params.id, resep)
            .then(res => console.log(res.data));

        window.location = '/';
    }

    render() {
        return (
            <div>
                <h3>Ubah Resep</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Nama: </label>
                        <input  type="text"
                            required
                            className="form-control"
                            value={this.state.nama}
                            onChange={this.onChangeNama}>
                        </input>
                    </div>
                    <div className="form-group">
                        <label>Deskripsi: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.deskripsi}
                            onChange={this.onChangeDeskripsi}
                        />
                    </div>
                    <div className="form-group">
                        <label>Gambar(copy link foto masakan disini): </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.gambar}
                            onChange={this.onChangeGambar}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Ubah Resep" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}
