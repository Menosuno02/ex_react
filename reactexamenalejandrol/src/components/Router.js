import React, { Component } from 'react'
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom'
import Home from './Home';
import Menu from './Menu';
import CreatePersonaje from './CreatePersonaje';
import UpdatePersonaje from './UpdatePersonaje';
import Serie from './Serie';
import Personajes from './Personajes';

export default class Router extends Component {
    render() {
        function SerieElement() {
            let { idserie } = useParams();
            return <Serie idserie={idserie} />
        }

        function PersonajesElement() {
            let { idserie } = useParams();
            return <Personajes idserie={idserie} />
        }

        return (
            <BrowserRouter>
                <Menu />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/serie/:idserie"
                        element={<SerieElement />} />
                    <Route path="/personajes/:idserie"
                        element={<PersonajesElement />} />
                    <Route path="/create" element={<CreatePersonaje />} />
                    <Route path="/update" element={<UpdatePersonaje />} />
                </Routes>
            </BrowserRouter>
        );
    }
}
