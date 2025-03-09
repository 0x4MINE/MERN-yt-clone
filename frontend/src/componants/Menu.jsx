import {
  Book,
  Compass,
  Flag,
  GamepadIcon,
  HelpCircle,
  History,
  HomeIcon,
  Library,
  Newspaper,
  Settings,
  Store,
} from "lucide-react";
import MenuButton from "./MenuButton";
import MenuDeviderLine from "./MenuDeviderLine";

const Menu = () => {
  return (
    <div className="menu">
      <div className="buttons">
        <MenuButton to={"/"} title={"Home"} Icon={HomeIcon} />
        <MenuButton to={"/trend"} title={"Explore"} Icon={Compass} />
        <MenuButton to={"/subscribed"} title={"subscribed"} Icon={Store} />
        <MenuDeviderLine />
        <MenuButton title={"Library"} Icon={Library} />
        <MenuButton to={"/history"} title={"History"} Icon={History} />
        <MenuDeviderLine />
        <h3 className="best-title">BEST OF MYTUBE</h3>
        <MenuButton title={"Quran"} Icon={Book} />
        <MenuButton title={"Gaming"} Icon={GamepadIcon} />
        <MenuButton title={"News"} Icon={Newspaper} />
        <MenuButton title={"Books"} Icon={Book} />
        <MenuDeviderLine />
        <MenuButton title={"Settings"} Icon={Settings} />
        <MenuButton title={"Report"} Icon={Flag} />
        <MenuButton title={"Help"} Icon={HelpCircle} />
        {/* <MenuButton title={"Switch mode"} Icon={Moon} /> */}
      </div>
    </div>
  );
};

export default Menu;
