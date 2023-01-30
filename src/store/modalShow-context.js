import React, { useState } from "react";

const ModContext = React.createContext({
    isShown: false,
    showCart: () => {},
    hideCart: () => {}
});

export function ModContextProvider (props) {
    const [cartIsShown, setCartIsShown] = useState(false);

    function showCartHandler () {
      setCartIsShown(true);
    };
  
    function hideCartHandler () {
      setCartIsShown(false);
    };
  
    return (
        <ModContext.Provider value = {{cartIsShown: cartIsShown, showCart: showCartHandler, hideCart: hideCartHandler}}>
            {props.children}
        </ModContext.Provider>
    );
};

export default ModContext;