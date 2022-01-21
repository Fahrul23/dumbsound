import React from 'react';
import File from '../../assets/icon/file.png';
import './input.scss'
export default function InputFile({text, name, ...rest}) {
  return (
    <div class="file-input">
        <input type="file" id={name} class="file" {...rest}  />
        <label for={name}>{text}</label>
        <div class="img-file">
            <img src={File} alt="file" />
        </div>
    </div>
  )
}
