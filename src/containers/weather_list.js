import React,{Component} from 'react';
import {connect} from 'react-redux';
import Chart from '../components/chart';
import GoogleMap from '../components/google_map';

class WeatherList extends Component{
    renderWeather(cityData){
        const name=cityData.city.name;
        const temps=_.map(cityData.list.map(weather=>weather.main.temp),(temp)=>temp-273);
        const press=cityData.list.map(weather=>weather.main.pressure);
        const humid=cityData.list.map(weather=>weather.main.humidity);
        const lat=cityData.city.coord.lat;      
        const lon=cityData.city.coord.lon;

        return (
            <tr key={name}>
                <td><GoogleMap lon={lon} lat={lat} /></td>
                <td><Chart data={temps} color="red" units="C" /></td>
                <td><Chart data={press} color="green" units="hPa" /></td>
                <td><Chart data={humid} color="blue" units="%" /></td>
            </tr>
            );
    }

    render(){
        return(
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>City</th>
                        <th>Temperature(C)</th>
                        <th>Pressure(hPa)</th>
                        <th>Humidity(%)</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.weather.map(this.renderWeather)}
                </tbody>
            </table>
        );
    }
}

function mapStateToProps({weather}){        //{weather} due to ES6 in the argument is=== (state.weather)
    return {weather};                       //{weather} due to ES6 in the return statement is ==={weather:weather}
}

export default connect(mapStateToProps)(WeatherList);