import * as React from "react"

class Bibtex extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
    this.handleCopyClick = this.handleCopyClick.bind(this)
    this.handleToggle = this.handleToggle.bind(this)
  }

  handleCopyClick() {
    navigator.clipboard.writeText(this.props.children)
  }

  handleToggle(event) {
    const {visible} = this.state
    this.setState({visible: !visible})
    event.preventDefault()
  }

  renderBibtex() {
    return (
      <div
        className="bibtex"
        style={{
          position: "relative",
          backgroundColor: "#f5f5f5",
          padding: "15px",
          borderRadius: "3px",
          margin: "15px 0"
        }}
      >
        <pre style={{margin: 0, fontSize: "0.9em"}}>
          {this.props.children}
        </pre>
        <button
          className="bibtex-copy"
          onClick={this.handleCopyClick}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            cursor: "pointer",
            backgroundColor: "#aaa",
            color: "#fff",
            border: "0",
            borderRadius: "3px",
            padding: "5px",
            outline: "none",
            fontSize: "0.8em",
            fontFamily: "sans-serif",
          }}
        >
          Copy
        </button>
      </div>
    )
  }

  render() {
    const {withToggle} = this.props
    const {visible} = this.state

    if (withToggle) {
      if (!visible) {
        return (
          <>
            <a href="#" onClick={this.handleToggle}>View BibTeX</a>
          </>
        )
      } else {
          return (
            <>
              <a href="#" onClick={this.handleToggle}>Hide BibTeX</a>
              {this.renderBibtex()}
            </>
          )
      }
    } else {
      return this.renderBibtex()
    }
  }
}

export default Bibtex
