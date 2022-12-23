import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const dummy_Product = [
  {
    id: "a1",
    title: "macbook pro air 1",
    price: 6,
    description: "its a laptop",
  },

  {
    id: "a2",
    title: "iphone14 pro+",
    price: 6,
    description: "its an ios phone",
  },
];
const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {dummy_Product.map((product) => (
          <ProductItem
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            description={product.description}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
