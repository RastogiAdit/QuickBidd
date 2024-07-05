import { Link } from "react-router-dom";

const CategoryNavigator = (category) => {
  console.log(category);
  return (
    <Link
      to="#"
      style={{
        textDecoration: "none",
      }}
      className="text-color"
    >
      <b>
        <i>{category.item.title}</i>
      </b>
    </Link>
  );
};

export default CategoryNavigator;
