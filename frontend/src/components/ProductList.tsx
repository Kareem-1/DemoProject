import { useEffect, useState } from "react"
import { Link } from "react-router-dom";


export default function ProductList() {
    const [data, setData] = useState<Record<string, any>[]>([]);
    const [checkedData, setCheckedData] = useState<Record<string, any>[]>([]);
    const [sendData, setSendData] = useState<string[]>([]);
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
        } catch (e) {
            console.error(e);
        }
    }
    useEffect(() => {
        getItems();
    }, [data])
    return (
        <div>
            <div>
                <p>Product List</p>
                <div>
                    <Link to="add-product"><button>ADD</button></Link>
                    <button onClick={() => { handleDelete() }}>MASS DELETE</button>
                </div>
            </div>
            <div className="product_list">
                {data.map((info) => {
                    let uniqueItem: string = "";
                    let type: string = "";
                    if (info.size != null) {
                        uniqueItem = info.size;
                        type = 'Size';
                    }
                    if (info.weight != null) {
                        uniqueItem = info.weight;
                        type = "Weight";
                    }
                    if (info.dimensions != null) {
                        uniqueItem = info.dimensions;
                        type = "Dimensions";
                    }
                    return (
                        <div className="product_items" key={info.id}>
                            <input type="checkbox" className="delete-checkbox" onClick={(e) => { setCheckedData([...checkedData, info.id]); }} />
                            <p>Item SKU: {info.id}</p>
                            <p>Item Name: {info.name}</p>
                            <p>Item Price: {info.price}</p>
                            <p>{type}: {uniqueItem}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}