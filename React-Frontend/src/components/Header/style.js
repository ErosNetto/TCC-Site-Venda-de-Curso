import styled from 'styled-components';
import * as colors from '../../config/colors';

export const HeaderInicio = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 85px; // 100px
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  color: ${colors.corPrimaria};
  z-index: 1;

  .btn-exp {
    display: flex;
    flex-direction: row;
    align-items: center;

    & i {
      font-size: 35px; // 40
      margin: 0 18px 0 26px; // 0 22px 0 27px;
      cursor: pointer;
      color: ${colors.corPrimaria};
    }
  }

  h1 {
    font-size: 2.3rem;
    color: ${colors.corPrimaria};

    & a {
      color: inherit;
      padding: 11px;
    }
  }

  ul {
    list-style: none;
    display: flex;
    flex-direction: row;

    & li {
      display: flex;
      align-items: center;
      margin: 0 22px 0 0;
    }
  }

  .a-horizontal {
    display: block;
    /* margin: 16px 22px 16px 0; */
    color: ${colors.corPrimaria};
    position: relative;
    cursor: pointer;
  }

  a i {
    display: flex;
    font-size: 35px;
    cursor: pointer;
    color: ${colors.corPrimaria};
    transition: 0.2s;
  }

  .a-horizontal > .he2 {
    display: none;
  }

  .a-horizontal:hover .he1 {
    display: none;
  }

  .a-horizontal:hover .he2 {
    margin-top: 2px;
    display: block;
  }

  .a-horizontal > .cart2 {
    display: none;
  }

  .a-horizontal:hover .cart1 {
    display: none;
  }

  .a-horizontal:hover .cart2 {
    margin-top: 2px;
    display: block;
  }

  .img-user img {
    display: flex;
    align-items: center;
    width: 65px;
    height: 65px;
  }

  /* Menu suspenso */
  .menu-hover:hover::after {
    content: '';
    position: absolute;
    top: 80px; // 80
    right: 22px;
    width: 105px; // 125
    height: 23px; // 30
  }

  .menu-hover:hover #menu-sus {
    visibility: visible;
    opacity: 1;
    display: block;
  }
`;

//  Barra de pesquisa
export const SearchBox = styled.div`
  /* margin-right: 22px; */
  position: relative;
  height: 50px;
  padding: 0px;
  border-radius: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: 0.4s;
  border: 1px solid #fff;

  input {
    background: none;
    border: 0;
    outline: 0;
    font-size: 16px;
    transition: 0.4s;
    width: 0;
    padding: 0;
    color: ${colors.corPrimaria};
  }

  a {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  &:hover > input,
  input:focus {
    width: 320px;
    padding-left: 20px;
  }

  &:hover > a,
  &:focus-within a {
    background: ${colors.corPrimaria};
  }

  &:hover > a i,
  &:focus-within a i {
    color: #fff;
  }

  &:hover,
  &:focus-within {
    border-color: ${colors.corPrimaria};
  }

  input::-webkit-input-placeholder {
    font-size: 16px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
      Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
      sans-serif;
    color: #aeaeae;
  }
`;

//  Menu suspeso
export const MenuSuspeso = styled.div`
  z-index: 1;
  position: absolute;
  top: 92px; // 105
  right: 22px;
  width: 316px;
  height: 438px; // 462
  background: #fff;
  transition: 0.2s;
  visibility: hidden;
  opacity: 0;
  display: block;

  .info-conteudo a {
    display: grid;
    grid-template-columns: 1fr 2fr;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    padding: 10px;
    transition: 0.2s;

    &:hover h3 {
      color: red;
    }
  }

  .info-img {
    display: flex;
    align-items: center;

    img {
      width: 80px;
      height: 80px;
    }
  }

  .info-text {
    display: flex;
    flex-direction: column;

    h3 {
      font-size: 18px;
      margin: 0 0 10px 0;
      color: ${colors.corPrimaria};
    }

    p {
      margin: 0;
    }
  }

  .info-text p {
    font-size: 12px;
    color: #aeaeae;
  }

  ul {
    padding: 10px 20px; // 20
    display: flex;
    flex-direction: column;
  }

  ul li {
    width: 100%;
  }

  ul li a {
    width: 100%;
    padding: 12px; // 15
    font-size: 18px;
    color: ${colors.corPrimaria};
    transition: 0.2s;

    &:hover {
      background: red;
    }
  }

  ul li:nth-child(4) {
    margin-top: 5px; /*20px*/
  }

  ul li:nth-child(6) {
    margin-top: 5px; /*20px*/
  }
`;

export const Nav = styled.nav`
  top: 85px; /*100px*/
  left: 0;
  position: fixed;
  z-index: 1;
  width: 85px; // 97px
  height: 100%;
  background: #fff;
  box-shadow: 3px 0 0 ${colors.corSecundaria};
  overflow: hidden;
  transition: 0.3s;

  &.expandir {
    width: 255px; // 300
  }

  ul {
    height: 100%;
    list-style-type: none;
  }

  ul li.item-menu {
    transition: 0.2s;
  }

  ul li.ativo {
    background: ${colors.corSecundaria};
  }

  ul li.item-menu:hover {
    background: ${colors.corSecundaria};
  }

  ul li.item-menu a {
    color: ${colors.corPrimaria};
    text-decoration: none;
    font-size: 25px;
    padding: 20px 4%;
    display: flex;
    margin-bottom: 5px; // 20
    line-height: 40px;
  }

  a .text-link {
    margin-left: 70px;
    margin-top: 1px;
    transition: 0.5s;
    opacity: 0;
    color: ${colors.corPrimaria};
  }

  &.expandir .text-link {
    margin-left: 20px;
    margin-top: 1px;
    opacity: 1;
  }

  a .icon i {
    font-size: 35px; // 40
    margin-left: 22px; //23
  }
`;
