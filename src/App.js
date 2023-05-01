import './App.css';
import React,{ useState} from 'react'
import AppRoutes from './routes/Routes';
import {MyComponent} from '../src/Hooks/usingCallback'

import NavItem from '../src/utils/NavList'
const MenuContext = React.createContext(NavItem);

function App() {
  const [menuItem,setMenuItem] = useState({currentValue:NavItem,changeItem: handleItem})
  const handleItem = (name) => {
    setMenuItem(name)
  }
  function onRender(id, phase, actualDuration, baseDuration, startTime, commitTime) {
    // Aggregate or log render timings...
    console.log("Id=>" +id,"Phase",phase,"actual Duration",actualDuration,"baseDuration",baseDuration,"startTime",startTime,"commitTime",commitTime)
  }
  return (
    
    <div className="App">
      
       <AppRoutes />
       {/* <MyComponent /> */}
    </div>
    
  );
}
export {MenuContext};
export default App;
