import styled, { createGlobalStyle } from 'styled-components';

export const NewFamousCotainerCss = styled.div`
    width: 80%;
    height: 200px;
    margin: 0 auto;
   
`

export const ContainerCss = styled.div`
  margin-bottom: 20px;
  position: relative;
  border-bottom: 1px solid #f0f0f0;
  .tag {
    position: absolute;
    left: -10%;
    font-size: 16px;
    font-weight: 700;
  }
 .news-item {
      display: inline-block;
      width: 166px;
      height: 37px;

      &:hover {
        color: red;
      }
    }
`