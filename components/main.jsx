class Main extends React.Component {
  render() {
    return (
      <main className="main-container">
        <section
          className="main-inner-container">
          {this.props.children}
        </section>
      </main>
    )
  }
}

export default Main
