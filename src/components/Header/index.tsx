/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './index.css';
import {
    WalletMultiButton,
  } from "@solana/wallet-adapter-react-ui";
import { Switch } from '@material-ui/core';
import { setThemeMode } from '../../store/action';
import styled, { css } from 'styled-components';
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Button from '../Button';
const useStyles = makeStyles(() => createStyles({
   light: {
     border: `1px solid rgba(255, 255, 255, 0.29)`,
     borderRadius: 28,
     position: 'relative',
     width: 85,
     height: 42,
   },
   dark: {
     background: `#1E1E1E`,
     border: `1px solid rgba(255, 255, 255, 0.29)`,
     borderRadius: 28,
     position: 'relative',
     width: 85,
     height: 42,
   }

}))

const SwitchBtn = styled.div`
${(props: { checked: any}) => {
  switch (props.checked) {
    case true: 
      return css`
        background-image: url("assets/img/night.png");
        background-repeat: no-repeat;
        background-size: cover;
      `;
    case false: 
      return css`
        background-image: url("assets/img/day.png");
        background-repeat: no-repeat;
        background-size: cover;
    `;
  }
}}
`
const SwitchToggle = styled.div`
  width: 85px;
  height: 42px;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  flex-wrap: no-wrap;
`;
const TransDiv =styled.div`
  opacity: 0;
  z-index: 1000;
  width: 100%;

`
const Logo = styled.div`
  ${(props: {mode: any}) => {
    switch (props.mode) {
      case 'true': 
        return css`
          background-image: url("assets/img/dark.png");
          background-repeat: no-repeat;
          height: 40px;
        `
      case 'false': 
        return css` 
          background-image: url("assets/img/light.png");
          background-repeat: no-repeat;
          height: 40px;
          `
    }
  }}
    @media(max-width: 900px) {
      background-image: url("assets/img/mobile.png");
      background-repeat: no-repeat;
    }
`;
const Header = ( props: any) => {
  const dispatch = useDispatch()
  const customClasses = useStyles();
  const themeMode = useSelector((state: any) => state.themeReducer.themeMode);
  const checked:boolean = ( themeMode === 0 );
  const [fadeClass, setFadeClass] = useState('');
  useEffect(() => {
    if ( props.fade ) {
      if ( props.scrollTop === 0 ) {
        setFadeClass('fade_in_top');
      } else {
        setFadeClass('fade_in')
      }
    } else setFadeClass('fade_out');
  }, [props])
  const onButtonClick = () => {
    props.onClick();
  }
  const setDark = () => {
    dispatch(setThemeMode(0))
  }
  const setLight = () => {
    dispatch(setThemeMode(1))
  }

  
  const buttonClass = (checked ? customClasses.dark : customClasses.light);
  // const fadeClass = ( props.fade || props.scrollTop === 0 ) ? 'fade_in' : 'fade_out';
    return (
      <header className={`header_container header ${props.className} justify-content-around ${fadeClass}`}>
        <Logo mode={checked ? 'true': 'false'} className={'col-sm-4 col-md-4 col-lg-4 col-xl-4 log_div'} />
        <div className={'col-sm-4 col-md-4 col-lg-4 col-xl-4 d-flex middle_part justify-content-center'}>
          <div className='content'>
            <span>Light</span>
          </div>
          <SwitchBtn checked={checked} className={`${buttonClass}`} >
            <SwitchToggle>
              <TransDiv onClick={setLight}></TransDiv>
              <TransDiv onClick={setDark}></TransDiv>
            </SwitchToggle>
          </SwitchBtn>
          <div className='content'>
            <span>Dark</span>
          </div>
        </div>
        <div className={'d-flex col-sm-4 col-md-4 col-lg-4 col-xl-4'}>
            {props.state ? <WalletMultiButton className='colored_btn m-auto ' />:
            <Button className='mr-0 colored_btn header_button' text={'Connect wallet'} onClick={onButtonClick}/>}
        </div>
      </header>
    )
}
export default Header;