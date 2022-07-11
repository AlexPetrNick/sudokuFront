import React from 'react';
import './App.css';
import {SudokuComponent} from "./sudoku/sudokuComponent";

type stateType = {
  complexity: 'easy' | 'normal' | 'hard'
}

const state:stateType = {
  complexity: 'normal'

}

function App() {
  return (
    <div className="wrapper_all">
      <div className="wrapper_menu">
        <div className="wrapper_field_sudoku">
            <SudokuComponent />
        </div>
        <div className="wrapper_menu_user"></div>
      </div>
    </div>
  );
}

export default App;
