import s from 'styled-components'

const StyledBlockQuote = s.blockquote`
  margin: 1.5em 10px;
  padding: 0.5em 10px;

  &:before {
    color: #ccc;
    content: open-quote;
    font-size: 4em;
    line-height: 0.1em;
    margin-right: 0.25em;
    vertical-align: -0.4em;
  }

  &:after {
    content: no-close-quote;
  }

  p {
    display: inline;
  }
`

export default StyledBlockQuote