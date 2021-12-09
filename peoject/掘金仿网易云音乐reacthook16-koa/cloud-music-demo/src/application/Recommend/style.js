/*
 * @Descripttion: 
 * @version: 
 * @Author: OpenLcuk
 * @Date: 2021-11-25 11:16:25
 * @LastEditors: OpenLcuk
 * @LastEditTime: 2021-11-25 11:16:26
 */
import styled from 'styled-components';

export const Content = styled.div`
    position: fixed;
    top: 94px;
    left: 0;
    bottom: ${props => props.play > 0 ? "60px" : 0};
    width: 100%;
`
