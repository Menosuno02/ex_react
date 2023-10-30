import React, { Component } from 'react'
import Global from '../Global'
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import loadingImage from "../assets/images/loading.gif";

export default class Serie extends Component {

  state = {
    serie: {},
    statusSerie: false
  }

  loadSerie = () => {
    let url = Global.urlSeries;
    let request = "api/Series/" + this.props.idserie;
    axios.get(url + request).then((response) => {
      this.setState({
        serie: response.data,
        statusSerie: true
      });
    });
  }

  componentDidMount = () => {
    this.loadSerie();
  }

  componentDidUpdate = (oldProps) => {
    if (this.props.idserie !== oldProps.idserie) {
      this.setState({
        statusSerie: false
      });
      this.loadSerie();
    }
  }

  render() {
    if (this.state.statusSerie) {
      return (
        <div className='container-fluid mt-3'>
          <h1>Serie {this.props.idserie}</h1>
          <hr className='border border-primary opacity-100' />
          <div className='card'>
            <img className="card-img-top" alt=""
              src={this.state.serie.imagen} />
            <div className='card-body'>
              <h5 className='card-title'>{this.state.serie.nombre}</h5>
              <p className='card-text'>IMDB: {this.state.serie.puntuacion}</p>
              <NavLink
                to={"/personajes/" + this.state.serie.idSerie}
                className="btn btn-primary w-100"
              >Personajes</NavLink>
            </div>
          </div>
        </div>
      )
    } else
      return (<img alt="" className='d-block mx-auto' src={loadingImage} />);
  }
}
