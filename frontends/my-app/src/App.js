import logo from './logo.svg';
import './App.css';
function App() {
  return (
    
  <div className="App">
   <header className="App-header">
    <input type="text" placeholder="Search..." />
    <button type="button">Submit</button>
    

  <form>
  <label>
  <br></br>
    UserId    
    <input type="text" name="user    " />
  </label>
  <br></br>
  <label>
    First Name
    <input type="text" name="fname" />
  </label>
  <br></br>
  <label>
    Last Name
    <input type="text" name="lname" />
  </label>
  <br></br>
  <label>
    Avatar
    <input type="text" name="ava" />
  </label>

 </form>
 <button type="button">Add as Friend</button>
 </header>
 </div>

  );
}

export default App;
