import React, { use } from 'react';
import { useParams } from 'react-router-dom';
import { useGetProductsQuery } from '../../Features/api/ApiSlice';

const Category = () => {
    const { id } = useParams();

		const defaultParams = { category: id };
		const [params, setParams] = React.useState({ category: id });
    useEffect(() => {}, []);

    const { data } = useGetProductsQuery({ category: id });

    return (
        <section>
            <h2>{data?.category}</h2>
            <form className="filters" onSubmit={() => {}}>
                <div className="filter">
                    <input
                        type="text"
                        name="title"
                        onChange={() => {}}
                        placeholder="Product Name"
                    />
                </div>
            </form>
        </section>
    );
};

export default Category;
