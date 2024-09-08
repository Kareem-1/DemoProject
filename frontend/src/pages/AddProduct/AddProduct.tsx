import React, { useContext, useState } from "react";
import Header from "../../components/Header/Header";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import "./AddProduct.scss";
import useInitData from "../../hooks/useInitData";
import { AppContext } from "../../contexts/AppContext";

export default function AddProduct() {
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const [formData, setFormData] = useState<FormData>();
  const itemType = formData?.get("item_type");
  const { loading, setLoading } = useContext(AppContext);
  const initData = useInitData();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);


    //Validation of existence of unique properties to add it in formData, and validation for value type
    if (e.currentTarget["item_height"] != undefined) {
      const itemHeight = e.currentTarget["item_height"].value || null;
      const itemWidth = e.currentTarget["item_width"].value || null;
      const itemLength = e.currentTarget["item_length"].value || null;
      const dimensions = `${itemHeight}x${itemWidth}x${itemLength}`;
      formData.set("item_feature", dimensions);
    }

    if (e.currentTarget["item_weight"] != undefined) {
      formData.set("item_feature", e.currentTarget["item_weight"].value);
    }
    if (e.currentTarget["item_size"] != undefined) {
      formData.set("item_feature", e.currentTarget["item_size"].value);
    }

    try {
      setLoading(true);
      const res: Response = await fetch(
        "https://demo-backend-vercel.fly.dev/api/",
        {
          method: "POST",
          body: formData,
        },
      );
      const info = await res.json();
      if (res.ok) {
        if (info.status == "formerror") {
          setMsg(info.message);
          setLoading(false);
          navigate("/");
        } else {
          initData();
          navigate("/");
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form id="product_form"
      className={`${loading && "loading"}`}
      onSubmit={handleSubmit}
      onChange={(e) => {
        setFormData(new FormData(e.currentTarget))
      }}>
      <Header title="Product Add">
        <Button type="submit" id="add-product-btn">
          Save
        </Button>
        <Button to="/" className="cancel-btn">
          Cancel
        </Button>
      </Header>

      <label className="text-input">
        <span>SKU</span>
        <input id="sku" name="item_sku" type="text" />
      </label>
      <label className="text-input">
        <span>Name</span>
        <input id="name" type="text" name="item_name" />
      </label>
      <label className="text-input">
        <span>Price ($)</span>
        <input id="price" name="item_price" />
      </label>

      <label className="add_labels">
        <span>Type Switcher</span>
        <select
          id="productType"
          defaultValue="none"
          name="item_type"
        >
          <option disabled value="none">
            None
          </option>
          <option value="Furniture">Furniture</option>
          <option value="DVD">DVD</option>
          <option value="book">book</option>
        </select>
      </label>

      {itemType === "DVD" && <><label>
        <span>Size (MB)</span>
        <input id="size" name="item_size" />
      </label>
        <p className="description">
          Please provide the size in megabytes of the DVD
        </p>
      </>}

      {itemType === "Book" && <>
        <label>
          <span>Weight (KG)</span>
          <input id="weight" name="item_weight" />
        </label>
        <p className="description">
          Please provide the weight of the book in kilograms
        </p>
      </>}

      {itemType === "Furniture" && <>
        <label>
          <span>Height (CM)</span>
          <input id="height" name="item_height" />
        </label>
        <label>
          <span>Width (CM)</span>
          <input id="width" name="item_width" />
        </label>
        <label>
          <span>Length (CM)</span>
          <input id="length" name="item_length" />
        </label>
        <p className="description">
          Please provide the dimensions in HxWxL format
        </p>
      </>}

      <p>{msg}</p>
    </form>
  )
}
