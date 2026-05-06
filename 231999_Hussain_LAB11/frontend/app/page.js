"use client";

import { useEffect, useState } from "react";
import api from "../services/api";
import ProductCard from "../components/product_card";

export default function Home() {
    const [products, set_products] = useState([]);
    const [loading, set_loading] = useState(true);

    useEffect(() => {
        const fetch_products = async () => {
            try {
                const res = await api.get("/products");
                set_products(res.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                set_loading(false);
            }
        };

        fetch_products();
    }, []);

    if (loading) {
        return <h1 className="p-6">Loading...</h1>;
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Products</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </div>
    );
}