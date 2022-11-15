import { createGlobalStyle } from "styled-components";



export const lightTheme = {
  body: "#fff",
  fontColor: "#000",
  while: "#fff",
  dayColor: "#181818",
  daySelected: "#0d6efd",
};

export const darkTheme = {
  body: "#181818",
  bodayModal: "#181818",
  color: "#fff",
  while: "#fff",
  border: "1px solid hsla(0,0%,100%, 0.09)",
  input: "hsla(0, 0%, 100%, 0.05)",
  dayDisabled: "#808080",
  dayColor: "#181818",
  daySelected: "#0d6efd",
};

export const GlobalStyles = createGlobalStyle`

	body {
		background-color: ${(props) => props.theme.body};
	}

  .table {
    color: ${(props) => props.theme.color};
  }

  .title {
    color: ${(props) => props.theme.color};
  }

  .modal-content {
    color: ${(props) => props.theme.color};
    background-color: ${(props) => props.theme.bodayModal};
  }

  .form-control {
    color:  ${(props) => props.theme.color};
    border:  ${(props) => props.theme.border};
    background-color: ${(props) => props.theme.input};
  }

  .form-control:focus {
    color:  ${(props) => props.theme.color};
    border:  ${(props) => props.theme.border};
    background-color: ${(props) => props.theme.input};
  }

  .select-date {
    color:  ${(props) => props.theme.color};
    border:  ${(props) => props.theme.border};
    background-color: ${(props) => props.theme.input};
  }

  .react-datepicker__header {
    color:  ${(props) => props.theme.color};
    border:  ${(props) => props.theme.border};
    background-color: ${(props) => props.theme.body};
  }

  .react-datepicker {
    color:  ${(props) => props.theme.color};
    border:  ${(props) => props.theme.border};
    background-color: ${(props) => props.theme.body};
  }

  .react-datepicker__current-month{
    color:  ${(props) => props.theme.color};
  }

  .react-datepicker__day {
    color:  ${(props) => props.theme.color};
  }

  .react-datepicker__day:hover {
    color:  ${(props) => props.theme.dayColor};
  }

  .react-datepicker__day-name {
    color:  ${(props) => props.theme.color};
  }

  .react-datepicker__day--disabled {
    color:  ${(props) => props.theme.dayDisabled};
  }

  .react-datepicker__day--selected {
    color:  ${(props) => props.theme.while};
    background-color:  ${(props) => props.theme.daySelected};
  }

  .react-datepicker__day--selected:hover {
    color:  ${(props) => props.theme.while};
    background-color:  ${(props) => props.theme.daySelected};
  }

  .react-datepicker__day--keyboard-selected {
    color:  ${(props) => props.theme.while};
    background-color:  ${(props) => props.theme.daySelected};
  }

  .react-datepicker__day--keyboard-selected:hover {
    color:  ${(props) => props.theme.while};
    background-color:  ${(props) => props.theme.daySelected};
  }

  .form-check-input {
    border:  ${(props) => props.theme.border};
    background-color: ${(props) => props.theme.input};
  }

`;