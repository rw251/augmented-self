import React, { Component } from 'react';
import ButtonLink from '../components/ButtonLink';
import './Home.css';

class Home extends Component {
  render() {
    return (
      <div className='Home'>
        <h1>Augmented Self(ish)</h1>
        <p>A few paragraphs of what we're trying to do. Long enough to wrap around.</p>
        <p>A few paragraphs of what we're trying to do.</p>
        <ButtonLink to="/edit">Let's Go!</ButtonLink>
      </div>
    )
  }
}

export default Home;