import React, { Component } from 'react'
import Global from '../Global'
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import loadingImage from "../assets/images/loading.gif";

export default class Personajes extends Component {

  state = {
    personajes: [],
    statusPersonajes: false
  }

  loadPersonajes = () => {
    let url = Global.urlSeries;
    let request = "api/Series/PersonajesSerie/" + this.props.idserie;
    axios.get(url + request).then((response) => {
      this.setState({
        personajes: response.data,
        statusPersonajes: true
      });
    });
  }

  componentDidMount = () => {
    this.loadPersonajes();
  }

  componentDidUpdate = (oldProps) => {
    if (this.props.idserie !== oldProps.idserie) {
      this.setState({
        statusPersonajes: false
      });
      this.loadPersonajes();
    }
  }

  render() {
    if (this.state.statusPersonajes) {
      return (
        <div className='container-fluid mt-3'>
          <h1>Personajes de {this.props.idserie}</h1>
          <hr className='border border-primary opacity-100' />
          <NavLink
            className="btn btn-danger w-100"
            to={"/serie/" + this.props.idserie}
          >Volver a serie</NavLink>
          <table className='table mt-3'>
            <thead className='border-primary'>
              <tr>
                <th>Personaje</th>
                <th>Imagen</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.personajes.map((pers, index) => {
                  return (
                    <tr key={index}>
                      <td>{pers.nombre}</td>
                      <td>
                        <img
                          style={{ height: "150px", width: "150px" }}
                          className='img-fluid'
                          alt=""
                          src={pers.imagen} />
                      </td>
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
        </div>
      )
    } else
      return (<img alt="" className='d-block mx-auto' src={loadingImage} />);
  }
}
