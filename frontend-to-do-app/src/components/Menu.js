import React from 'react';

const Menu = ({ onOptionSelect }) => (
  <nav>
    <ul>
      <li>
        <button onClick={() => onOptionSelect('crear')}>Crear tarea</button>
      </li>
      <li>
        <button onClick={() => onOptionSelect('listar')}>Listar tareas</button>
      </li>
    </ul>
  </nav>
);

export default Menu;
