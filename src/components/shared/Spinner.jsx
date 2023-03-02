import spinner from "../../assets/loading-gif.gif";

const Spinner = () => {
  return (
    <img
      src={spinner}
      alt="loadging..."
      style={{ width: "100px", margin: "auto", display: "block" }}
    ></img>
  );
};

export default Spinner;
