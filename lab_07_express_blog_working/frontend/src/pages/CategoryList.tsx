import { useCategories } from "../api/api";

export default function CategoryList() {
    const categories = useCategories();

    return (
        <div className="category-list-view">
            <h1>Categories</h1>
            <div className="categories-container">
                {categories.isLoading && <h3>Loading...</h3>}
                {categories.isError && <h3>Error occurred.</h3>}
                {categories.data?.map((category, index) => (
                    <div className="category-entry" key={`cat${index}`}>
                        <h3>{ category.title }</h3>
                        <p>{ category.description }</p>
                    </div>
                ))}
            </div>
        </div>
    )
}