import React from 'react';
import File from '../../assets/icon/file.png';
import './input.scss'
export default function InputFile({text}) {
  return (
    <div class="file-input">
        <input type="file" class="file" />
        <label for="file">{text}</label>
        <div class="img-file">
            <img src={File} alt="file" />
        </div>
    </div>
  )
}
