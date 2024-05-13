import { createTheme } from "@material-ui/core"

/**
 * material-ui theme color pallete
 * @see https://material-ui.com/style/color/
 */

export const LightTheme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: `rgb(239, 242, 249)`,
      light: `#F4F7FE`,
      dark: `#000000`
    },
    text: {
      primary: `rgba(0, 0, 0, 0.7)`,
      secondary: `#0D1738`
    },
    background: {
      paper: `#FFFFFF`,
      default: "linear-gradient(180deg, rgba(219, 166, 86, 0.1) 0%, rgba(255, 255, 255, 0) 50.11%, rgba(254, 240, 190, 0.0435921) 100%), #F4F7FE",
      
    },
    secondary: {
      light:'#FFFFFF',
      main: '#EFF2F9',
      dark: '1px solid rgba(0, 0, 0, 0.1)',
      contrastText:'1px solid rgba(0, 0, 0, 0.1)'
    },
    common: {
      black: '#FFFFFF',
      white: '2px solid rgba(0, 0, 0, 0.3)'
    }
  },
})

export const DarkTheme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: `rgba(255,255,255,0.05)`,
      light: `#000000`,
      dark: `#FFFFFF`
    },
    text: {
      primary: `rgba(255, 255, 255, 0.7)`,
      secondary: `#FFFFFF`
    },
    background: {
      paper: `#1E1E1E`,
      default: "linear-gradient(180deg, rgba(219, 166, 86, 0.1) 0%, rgba(255, 255, 255, 0) 50.11%, rgba(254, 240, 190, 0.0435921) 100%), #1E1E1E"
    },
    secondary: {
      light:'rgba(255,255,255,0.1)',
      main: 'rgba(255,255,255,0.05)',
      dark: '1px solid rgba(255, 255, 255, 0.2)',
      contrastText: '1px solid rgba(255, 255, 255, 0.7)'
    },
    common: {
      black: 'linear-gradient(90deg, rgba(252, 220, 105, 0.25) 0.68%, rgba(255, 255, 255, 0) 41.55%), #1E1E1E',
      white: '2px solid #BFCDFF'
    }

  },
});
