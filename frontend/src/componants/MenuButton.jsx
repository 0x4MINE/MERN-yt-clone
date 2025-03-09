import { Link } from "react-router-dom";


const MenuButton = ({Icon,title,to}) => {
  return (
    <Link to={to} className="btn">
      < Icon className="selected" />
      {title}
    </Link>
  );
};

export default MenuButton;
