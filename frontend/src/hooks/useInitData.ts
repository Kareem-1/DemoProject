import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

export default function useInitData() {
  const { setData, setLoading } = useContext(AppContext);

  const initData = async () => {
    //const navigate = useNavigate();
    setLoading(true);
    try {
      const response = await fetch("https://demo-backend-vercel.fly.dev/api/", {
        method: "GET",
      });
      const responseData = await response.json();
      setData(responseData.data ?? []);
    } catch (e) {
      console.error(e);
      setData([]);
      await initData();
    } finally {
      setLoading(false);
    }
  };

  return initData;
}
