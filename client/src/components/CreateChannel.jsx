import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";
import ChannelCreateForm from "../components/ChannelForm";

function ChannelFallback() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCreateChannel = async ({ channelName, description }) => {
    try {
      const res = await fetch("http://localhost:5000/api/channels", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ channelName, description }),
      });

      const data = await res.json();
      if (res.ok) {
        navigate(`/channel/${data._id}`);
      } else {
        alert(data.message || "Failed to create channel");
      }
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="p-4">
      <ChannelCreateForm onSubmit={handleCreateChannel} />
    </div>
  );
}

export default ChannelFallback;