import axios from "axios";

const Header = () => {
  const makePayment = async () => {
    let response = await axios.post("http://localhost:8000/todos/checkout");
    if (response && response.status === 200) {
      window.location.href = response.data.url;
      console.log(response.data);
    }
  };

  return (
    <header>
      <button
        onClick={makePayment}
        style={{
          backgroundColor: "orangered",
          color: "black",
          cursor: "pointer",
          position: "fixed",
          top: "10px",
          right: "50px",
        }}
      >
        Subscribe
      </button>
      <h1>TodoList</h1>
    </header>
  );
};

export default Header;
