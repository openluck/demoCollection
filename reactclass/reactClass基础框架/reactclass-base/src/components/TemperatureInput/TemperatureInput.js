/*
 * @Descripttion: 
 * @version: 
 * @Author: OpenLcuk
 * @Date: 2021-11-29 13:11:24
 * @LastEditors: OpenLcuk
 * @LastEditTime: 2021-11-29 13:26:27
 */
//TemperatureInput Class
import React from 'react'
class TemperatureInput extends React.Component{
    constructor(props){
        super(props);
    }
    handleTemp = (e) =>{
        // 接受父组件传递过来的函数，调用并传值给父组件
        this.props.onTemperateChange(e.target.value)
    };
    render(){
        return(
            <p>
                <label htmlFor="tempInput">请输入天气温度：</label>
                {/* onChange 事件调用函数*/}
                <input className="Tem-input" type="text" name="tempInput" value={this.props.temperature} onChange={this.handleTemp}/>
            </p>
        );
    }
}

export default TemperatureInput
