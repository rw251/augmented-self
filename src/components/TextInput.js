import React from 'react';
import './TextInput.css';

const TextInput = ({question, autofocus}) => (
  <div className="TextInput">
    <label htmlFor={question}>{question}</label>
    <input name={question} type="text" placeholder="Please enter a response" autoFocus={autofocus}/>
  </div>
)

export default TextInput;