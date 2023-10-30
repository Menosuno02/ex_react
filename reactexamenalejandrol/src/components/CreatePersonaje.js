import React, { Component } from 'react'
import Global from '../Global';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import loadingImage from "../assets/images/loading.gif";

export default class CreatePersonaje extends Component {
  cajaNom = React.createRef();
  cajaImg = React.createRef();
  selectSerie = React.createRef();

  state = {
    series: [],
    statusSeries: false,
    statusCreate: false
  }

  loadSeries = () => {
    let url = Global.urlSeries;
    let request = "api/Series";
    axios.get(url + request).then((response) => {
      this.setState({
        series: response.data,
        statusSeries: true
      });
    });
  }

  createPersonaje = (event) => {
    event.preventDefault();
    let personaje = {
      idPersonaje: 1,
      nombre: this.cajaNom.current.value,
      imagen: this.cajaImg.current.value,
      idSerie: parseInt(this.selectSerie.current.selectedOptions[0].value)
    }
    let url = Global.urlSeries;
    let request = "api/Personajes";
    axios.post(url + request, personaje).then((response) => {
      this.setState({
        statusCreate: true
      });
    });
  }

  componentDidMount = () => {
    this.loadSeries();
  }

  componentDidUpdate = () => {
    if (this.state.statusCreate) {
      this.setState({
        statusCreate: false
      });
    }
  }

  render() {
    if (this.state.statusCreate)
      return (<Navigate
        to={"/personajes/" + this.selectSerie.current.selectedOptions[0].value} />);
    if (this.state.statusSeries) {
      return (
        <div className='container-fluid mt-3'>
          <h1>Crear personaje</h1>
          <hr className='border border-primary opacity-100' />
          <form>
            <div className='mt-3'>
              <label className='form-label'>Nombre</label>
              <input
                className='form-control'
                type='text'
                ref={this.cajaNom} />
            </div>
            <div className='mt-3'>
              <label className='form-label'>Imagen</label>
              <input
                className='form-control'
                type='text'
                ref={this.cajaImg} />
            </div>
            <div className='mt-3'>
              <label className='form-label'>Serie</label>
              <select className='form-select'
                ref={this.selectSerie}>
                {
                  this.state.series.map((serie, index) => {
                    return (
                      <option key={index} value={serie.idSerie}>
                        {serie.nombre}
                      </option>
                    );
                  })
                }
              </select>
            </div>
            <button
              onClick={this.createPersonaje}
              className='btn btn-success mt-3 w-100'>
              Crear personaje
            </button>
          </form>
        </div>
      )
    } else
      return (<img alt="" className='d-block mx-auto' src={loadingImage} />);
  }
}
