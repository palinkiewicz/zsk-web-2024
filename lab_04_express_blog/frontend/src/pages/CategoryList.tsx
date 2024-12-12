export default function CategoryList() {
    const categories = [
        { name: "Electronics", description: "Explore the world of gadgets and technology." },
        { name: "Communication", description: "Dive into the art of connecting with others." },
        { name: "Geography", description: "Learn about our planet and its features." },
    ];

    return (
        <div className="category-list-view">
            <h1>Categories</h1>
            <div className="categories-container">
                {categories.map((category, index) => (
                    <div className="category-entry" key={`cat${index}`}>
                        <h3>{ category.name }</h3>
                        <p>{ category.description }</p>
                    </div>
                ))}
            </div>
        </div>
    )
}