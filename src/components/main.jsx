class Main extends React.Component {
  render() {
    return (
      <main className="main-container">
        <div
          className="main-inner-container">
          {this.props.children}
        </div>
      </main>
    )
  }
}

export default Main
