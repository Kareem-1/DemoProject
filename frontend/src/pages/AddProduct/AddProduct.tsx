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

    //Validation of data existence, and item's price data type
    for (const [key, value] of formData.entries()) {
      if (!value) {
        return setMsg("Please, submit required data");
      }

      if (key === "item_price" && (!Number(value) || Number(value) <= 0)) {
        return setMsg("Please, provide a valid price");
      }
    }

    //Validation of existence of unique properties to add it in formData, and validation for value type
    if (e.currentTarget["item_height"] != undefined) {
      const itemHeight = e.currentTarget["item_height"].value || null;
      const itemWidth = e.currentTarget["item_width"].value || null;
      const itemLength = e.currentTarget["item_length"].value || null;
      const dimensions = `${itemHeight}x${itemWidth}x${itemLength}`;
      if (
        isNaN(Number(itemHeight)) ||
        isNaN(Number(itemLength)) ||
        isNaN(Number(itemWidth))
      ) {
        setMsg("Please, provide valid dimensions");
        return;
      }
      formData.set("item_feature", dimensions);
    }

    if (e.currentTarget["item_weight"] != undefined) {
      formData.set("item_feature", e.currentTarget["item_weight"].value);
      if (isNaN(Number(e.currentTarget["item_weight"].value))) {
        setMsg("Please, provide valid weight");
        return;
      }
    }
    if (e.currentTarget["item_size"] != undefined) {
      formData.set("item_feature", e.currentTarget["item_size"].value);
      if (isNaN(Number(e.currentTarget["item_size"].value))) {
        setMsg("Please, provide valid size");
        return;
      }
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
      setMsg(info.item_sku + info.item_name + info.item_price + info.item_type);
      if (res.ok) {
        if (info.status == "error") {
          setMsg("Please, use an SKU that does not already exist");
          setLoading(false);
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
        <input id="name" name="item_name" />
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
          <option value="Book">Book</option>
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
