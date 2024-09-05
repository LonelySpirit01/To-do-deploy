import axios from "axios";

const API_URL = "https://to-do-deploy.onrender.com";
const Header = () => {
  const makePayment = async () => {
    let response = await axios.post(`${API_URL}/todos/checkout`);
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
