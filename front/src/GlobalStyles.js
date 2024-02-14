import { createGlobalStyle } from "styled-components";

interface Props {
    theme: {
        body: String;
    }
}

export const GlobalStyles = createGlobalStyle<Props>`
    body{
        background-color: ${props => props.theme.body};
    }
`