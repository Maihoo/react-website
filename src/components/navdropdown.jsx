import React from 'react';

const navDropdown = ({children, to, customClass}) => (
  <div className={"nav-dropdown-wrapper"} name={customClass ||'menubtn-dropdown'}>
    <button id="nav-dropdown-trigger" onClick={testFunction}>
      ▼
    </button>
    <div className={"nav-dropdown-tooltip"}>
        {children || "Not defined"}
    </div>
  </div>
)

function testFunction(event) {
  console.log('test')
};

export default navDropdown;
