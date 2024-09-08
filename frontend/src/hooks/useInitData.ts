import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

export default function useInitData() {
  const { setData, setLoading } = useContext(AppContext);

  const initData = async () => {
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
