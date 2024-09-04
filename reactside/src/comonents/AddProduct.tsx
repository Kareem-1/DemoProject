import React, { useEffect, useState } from 'react';
import '../sass.scss'

interface ProductData {
  item_sku: string;
  item_name: string;
  item_price: string;
  item_type: string;
  item_feature: string;
}

export default function AddProduct() {
  const [itemType, setItemType] = useState<string>('');
  const [itemSku, setItemSku] = useState<string>('');
  const [itemName, setItemName] = useState<string>('');
  const [itemPrice, setItemPrice] = useState<number>(0);
  const [itemFeature, setItemFeature] = useState<string>('');
  const [itemHeight, setItemHeight] = useState<string>('');
  const [itemWidth, setItemWidth] = useState<string>('');
  const [itemLength, setItemLength] = useState<string>('');
  const [msg, setMsg] = useState<string>('');

  useEffect(() => {
    setItemFeature('');
    setItemHeight('');
    setItemWidth('');
    setItemLength('');
  }, [itemType]);

  const handleClick = async (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    e.preventDefault();
    console.log(itemType);
    let dimensions = itemHeight + "x" + itemWidth + "x" + itemLength;
    let dataI: ProductData = {
      item_sku: itemSku,
      item_name: itemName,
      item_price: itemPrice.toString(),
      item_type: itemType,
      item_feature: itemFeature,
    };
    if (itemHeight != '' && itemWidth != '' && itemLength  != '') {
      dataI = {
        item_sku: itemSku,
        item_name: itemName,
        item_price: itemPrice.toString(),
        item_type: itemType,
        item_feature: dimensions,
      };
    }
    console.log(dataI);
    try {
      let res: Response = await fetch("http://localhost:80/demoproject/phpside/index.php", {
        method: 'POST',
        headers: {
          'Content-Type': "application/json",
        },
        body: JSON.stringify(dataI),
      });

      //setMsg(data.item_name + data.item_price + data.item_sku);
      let info = await res.json();
      console.log(info)
      setMsg(info.item_sku + info.item_name + info.item_price + info.item_type)
    } catch (e) {
      console.error(e);
    }
  }
  return (
    <div className="App">
      <h2 className='title'>Product Add</h2>
      <hr />
      <form method='POST' id='product_form'>
        <label className='add_labels'>
          <p>SKU</p>
          <input required name='item_sku' id='item_sku' value={itemSku} onChange={(e) => { setItemSku(e.target.value) }} type="text" />
        </label>
        <label className='add_labels'>
          <p>Name</p>
          <input required name='item_name' id='item_name' value={itemName} onChange={(e) => { setItemName(e.target.value) }} />
        </label>
        <label className='add_labels'>
          <p>Price</p>
          <input required name='item_price' id='item_price' onChange={(e) => { setItemPrice(parseInt(e.target.value)) }} />
        </label>
        <label className='add_labels'>
          <p>Item Type</p>
          <select defaultValue='none' name='item_type' id='item_type' onChange={(e) => { setItemType(e.target.value) }}>
            <option disabled value="none">None</option>
            <option value="Furniture">Furniture</option>
            <option value="DVD">DVD</option>
            <option value="Book">Book</option>
          </select>
        </label>
        {
          itemType == "Book" &&
          <div>
            <label>
              <p>Weight</p>
              <input type='number' name='item_feature' id='item_feature' onChange={(e) => { setItemFeature(e.target.value) }} />
            </label>
          </div>
        }
        {
          itemType == "DVD" &&
          <div>
            <label>
              <p>Size</p>
              <input type='number' name='item_feature' id='item_feature' onChange={(e) => { setItemFeature(e.target.value) }} />
            </label>
          </div>
        }
        {
          itemType == "Furniture" &&
          <div>
            <label>
              <p>Height</p>
              <input type='number' name='item_height' id='item_height' onChange={(e) => { setItemHeight(e.target.value) }} />
            </label>
            <label>
              <p>Width</p>
              <input type='number' name='item_width' id='item_width' onChange={(e) => { setItemWidth(e.target.value) }} />
            </label>
            <label>
              <p>Length</p>
              <input type='number' name='item_length' id='item_length' onChange={(e) => { setItemLength(e.target.value) }} />
            </label>
          </div>
        }
        <label className='add_labels'>
          <input type="submit" onClick={(e) => { handleClick(e); }} />
        </label>
      </form>
      <p>{msg}</p>
    </div>
  );
}

