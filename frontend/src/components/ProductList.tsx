import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import '../sass/list.scss'


export default function ProductList() {
    const [data, setData] = useState<Record<string, any>[]>([]);
    const [checkedData, setCheckedData] = useState<Record<string, any>[]>([]);
    const [sendData, setSendData] = useState<string[]>([]);
    const navigate = useNavigate();
    const handleAdd  = () =>{
        navigate('/add-product');
    }
    const getItems = async () => {
        try {
            const res = await fetch('http://localhost:80/demoproject/backend/')
                .then(async (info) => { const data = await info.json(); setData(data.data); })
        } catch (e) {
            console.error(e);
        }
    }
    useEffect(() => {

        checkedData.map((d) => {
            const quotedData = `"${d}"`;
            setSendData([...sendData, quotedData]);
        })
    }, [checkedData])
    const handleDelete = async () => {
        try {
            const res = await fetch('http://localhost:80/demoproject/backend/', {
                method: "DELETE",
                headers: {
                    'Content-Type': "application/json",
                },
                body: JSON.stringify(sendData)
            })
            const data = await res.json();
            console.log(data);
        } catch (e) {
            console.error(e);
        }
    }
    useEffect(() => {
        getItems();
    }, [data])
    return (
        <div className="product-list">
            <div className="header">
                <h1>Product List</h1>
                <button onClick={()=>{handleAdd()}} id="add-product-btn">ADD</button>
                <button id="delete-product-btn" onClick={() => { handleDelete() }}>MASS DELETE</button>

            </div>
            <hr />
            <div className="products">
                {data.map((info) => {
                    let uniqueItem = "";
                    let type = "";
                    let metric = "";
                    if (info.size != null) {
                        uniqueItem = info.size;
                        type = 'Size';
                        metric = "MBS"
                    }
                    if (info.weight != null) {
                        uniqueItem = info.weight;
                        type = "Weight";
                        metric = "KG"
                    }
                    if (info.dimensions != null) {
                        uniqueItem = info.dimensions;
                        type = "Dimensions";
                        metric = "HxWxL"

                    }
                    return (
                        <div className="product" key={info.id}>
                            <input type="checkbox" className="delete-checkbox" onClick={(e) => { setCheckedData([...checkedData, info.id]); }} />
                            <div className="product-details">
                                <p>Item SKU: {info.id}</p>
                                <p>Item Name: {info.name}</p>
                                <p>Item Price: {info.price}</p>
                                <p>{type}: {uniqueItem} ({metric})</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}