import React, { Component } from 'react'
import Global from '../Global'
import axios from 'axios';
import { Navigate } from 'react-router-dom';

export default class UpdatePersonaje extends Component {
  selectSerie = React.createRef();
  selectPersonaje = React.createRef();

  state = {
    series: [],
    personajes: [],
    statusGet: false,
    statusUpdate: false,
    serie: {},
    personaje: {},
    statusSerie: false,
    statusPersonaje: false
  }

  loadOpciones = () => {
    let url = Global.urlSeries;
    let request = "api/Series";
    axios.get(url + request).then((response) => {
      this.setState({
        series: response.data
      });
    });
    request = "api/Personajes";
    axios.get(url + request).then((response) => {
      this.setState({
        personajes: response.data,
        statusGet: true
      });
    });
  }

  loadSerieData = () => {
    let url = Global.urlSeries;
    let request = "api/Series/" +
      this.selectSerie.current.selectedOptions[0].value;
    axios.get(url + request).then((response) => {
      this.setState({
        serie: response.data,
        statusSerie: true
      });
    });
  }

  loadPersonajeData = () => {
    let url = Global.urlSeries;
    let request = "api/Personajes/" +
      this.selectPersonaje.current.selectedOptions[0].value;
    axios.get(url + request).then((response) => {
      this.setState({
        personaje: response.data,
        statusPersonaje: true
      });
    });
  }

  updatePersonaje = (event) => {
    event.preventDefault();
    let url = Global.urlSeries;
    let request = "api/Personajes/" +
      this.selectPersonaje.current.selectedOptions[0].value + "/"
      + this.selectSerie.current.selectedOptions[0].value;
    axios.put(url + request).then((response) => {
      this.setState({
        statusUpdate: true
      });
    });
  }

  componentDidMount = () => {
    this.loadOpciones();
  }

  componentDidUpdate = () => {
    if (this.state.statusUpdate) {
      this.setState({
        statusUpdate: false
      });
    }
  }

  render() {
    if (this.state.statusUpdate)
      return (<Navigate
        to={"/personajes/" + this.selectSerie.current.selectedOptions[0].value} />);
    if (this.state.statusGet) {
      return (
        <div className='container-fluid mt-3'>
          <h1>Modificar personaje</h1>
          <hr className='border border-primary opacity-100' />
          <form>
            <div className='mt-3'>
              <label className='form-label'>Serie</label>
              <select
                onChange={this.loadSerieData}
                className='form-select'
                ref={this.selectSerie}>
                {
                  this.state.series.map((serie, index) => {
                    return (
                      <option key={index}
                        value={serie.idSerie}>
                        {serie.nombre}
                      </option>
                    )
                  })
                }
              </select>
            </div>
            <div className='mt-3'>
              <label className='form-label'>Personaje</label>
              <select
                onChange={this.loadPersonajeData}
                className='form-select'
                ref={this.selectPersonaje}>
                {
                  this.state.personajes.map((pers, index) => {
                    return (
                      <option key={index}
                        value={pers.idPersonaje}>
                        {pers.nombre}
                      </option>
                    )
                  })
                }
              </select>
            </div>
            <button
              className='btn btn-success w-100 mt-3'
              onClick={this.updatePersonaje}>
              Modificar personaje
            </button>
          </form >
          <div className='row mt-3'>
            {
              this.state.statusSerie &&
              (
                <div className='col-6'>
                  <h3>{this.state.serie.nombre}</h3>
                  <hr className='border border-primary opacity-100' />
                  <img className='img-fluid' alt=""
                    src={this.state.serie.imagen} />
                </div>
              )
            }
            {
              this.state.statusPersonaje &&
              (
                <div className='col-6'>
                  <h3>{this.state.personaje.nombre}</h3>
                  <hr className='border border-primary opacity-100' />
                  <img className='img-fluid' alt=""
                    src={this.state.personaje.imagen} />
                </div>
              )
            }
          </div>
        </div >
      );
    }
  }
}
