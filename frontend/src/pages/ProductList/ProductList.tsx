import { FormEvent, useContext } from "react";
import Header from "../../components/Header/Header";
import Button from "../../components/Button/Button";
import "./ProductList.scss";
import { AppContext } from "../../contexts/AppContext";
import useInitData from "../../hooks/useInitData";

export default function ProductList() {
  const { data, loading, setLoading } = useContext(AppContext);
  const initData = useInitData();

  const handleDelete = async (e: FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    const selectedProductIds = [...new FormData(e.currentTarget).keys()].map(productId => `"${productId}"`);

    try {
      const res = await fetch("https://demo-backend-vercel.fly.dev/api/", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedProductIds),
      });
      const data = await res.json();
      await initData();
      console.log(data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form onSubmit={handleDelete} className={`${loading && "loading"}`}>
      <Header title="Product List">
        <Button to="add-product" id="add-product-btn">
          ADD
        </Button>
        <Button type="submit" id="delete-product-btn">
          MASS DELETE
        </Button>
      </Header>

      <div id="products">
        {data.map((product) => {
          const type = product.size ? "Size" : product.weight ? "Weight" : product.dimensions ? "Dimensions" : null;
          const uniqueItem = product.size || product.weight || product.dimensions;
          const metric = product.size ? "MB" : product.weight ? "KG" : product.dimensions ? "" : null;
          return (
            <div className="product" key={product.id}>
              <input name={product.id} type="checkbox" className="delete-checkbox" />
              <div className="product-details">
                <span>{product.id}</span>
                <span>{product.name}</span>
                <span>${product.price}</span>
                <span>
                  {type}: {uniqueItem} {metric}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </form>
  );
}
