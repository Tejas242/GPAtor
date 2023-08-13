import "./styles.css";
import DropdownSelector from "./components/DropdownSelector";

export default function App() {
  return (
    <div className="App">
      <h1>GPAtor</h1>
      <p>Your own GPA Calculator</p>
      <DropdownSelector />
      <footer>Star on <a href="https://github.com/Tejas242/GPAtor">GitHub</a></footer>
    </div>
  );
}
