/*
 * @Descripttion: 
 * @version: 
 * @Author: OpenLcuk
 * @Date: 2021-11-29 13:13:21
 * @LastEditors: OpenLcuk
 * @LastEditTime: 2021-11-29 13:24:27
 */
//TemperatureContainer  Class
import React from 'react'
import TemperatureInput from '../../components/TemperatureInput/TemperatureInput'
import TemperatureShow from '../../components/TemperatureShow/TemperatureShow'
class TemperatureContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            temperature: ''
        };
    }
    // 父组件中的函数,接受一个参数
    handleTemp = (temperature) => {
        this.setState({
            temperature: temperature
        })
    }

    render() {
        let temperature = this.state.temperature;
        return (
            <div>
                <TemperatureInput temperature={temperature} onTemperateChange={this.handleTemp} />
                <TemperatureShow temperature={parseFloat(temperature)} />
            </div>
        )
    }
}
export default TemperatureContainer