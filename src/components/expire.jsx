import React, { useEffect, useState } from "react";

const Expire = props => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setVisible(false);
    }, props.delay);
  }, [props.delay]);

  if(visible) { return <div className={'intro'} style={{}}>{props.children}</div>; }
  else { return <div className={'intro-hidden'}>{props.children}</div>; }
};

export default Expire;