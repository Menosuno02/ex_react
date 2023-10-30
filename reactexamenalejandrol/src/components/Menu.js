import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import Global from "../Global"
import axios from 'axios'

export default class Menu extends Component {
  state = {
    series: [],
    statusSeries: false
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

  componentDidMount = () => {
    this.loadSeries();
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg bg-primary"
        data-bs-theme="dark">
        <div className="container-fluid">
          <span className='text-light fw-bold'>Examen React</span>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/create">Nuevo personaje</NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/update">Modificar personaje</NavLink>
              </li>
              {
                this.state.statusSeries &&
                (
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle"
                      href="#"
                      role="button" data-bs-toggle="dropdown"
                      aria-expanded="false">
                      Series
                    </a>
                    <ul className="dropdown-menu">
                      {
                        this.state.series.map((serie, index) => {
                          return (
                            <li key={index}>
                              <NavLink className="dropdown-item"
                                to={"/serie/" + serie.idSerie}
                              >{serie.nombre}</NavLink>
                            </li>
                          )
                        })
                      }
                    </ul>
                  </li>
                )
              }
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}
