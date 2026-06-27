import Navbar from "../components/Navbar";

function Home() {
  return (
    <>
      <Navbar />

      <div className="container">
        <h1>Notifications</h1>

        <p>Welcome to the Notification Dashboard</p>

        <br />

        <div
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0px 2px 10px rgba(0,0,0,0.1)",
          }}
        >
          No notifications found.
        </div>
      </div>
    </>
  );
}

export default Home;