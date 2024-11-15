import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyCategories } from "../../../Database/Category/Categories";
import SearchBar from "../Bars/SearchBar";

interface CategoriesMenuProps {
  setShowMenu?: React.Dispatch<React.SetStateAction<any>>;
}

const CategoriesMenu = ({ setShowMenu }: CategoriesMenuProps) => {
  const navigate = useNavigate();
  const [isMobile] = useState(window.innerWidth < 700);
  const [displayedCategories, setDisplayedCategories] = useState<JSX.Element[]>(
    []
  );
  const [categories, setCategories] = useState<Record<string, string>>({});
  const [currentCategory, setCurrentCategory] = useState<string>("");

  useEffect(() => {
    const categoryArray = Object.keys(categories).map((category) => {
      const style =
        currentCategory.toLowerCase() === category.toLowerCase()
          ? "border-b-2 border-black pb-1"
          : "hover:border-b-2 hover:border-gray-300 pb-1";

      return (
        <a
          onClick={(event) => categoryHandler(event, category)}
          href="#"
          title={category}
          key={category}
          className={`${style} cursor-pointer px-2 py-1 rounded text-lg`} // Increased font size
        >
          {category}
        </a>
      );
    });

    setDisplayedCategories(categoryArray);
  }, [categories, currentCategory]);

  useEffect(() => {
    setDummyCategories();
  }, []);

  const setDummyCategories = () => {
    setCategories(dummyCategories);
  };

  const categoryHandler = (event: any, category: string) => {
    if (category === 'Ahabanza' || category === 'Home') {
      if (setShowMenu) {
        setShowMenu(false);
      }
      navigate("/");
      return;
    }
    if (category === 'Amamodoka' || category === 'Cars') {
      navigate('/cars');
      return;
    }
    setCurrentCategory(category);
    if (setShowMenu) {
      setShowMenu(false);
    }
    navigate(`/category/${category}`);
  };

  return (
    <nav className="flex flex-col gap-10 xmd:gap-8 md:gap-10 lg:gap-12 xmd:flex xmd:flex-row items-center justify-between xmd:justify-center h-16 text-neutral-600 text-m xmd:w-[100%]">
      {" "}
      {/* Increased font size */}
      <p
        onClick={(event) => categoryHandler(event, "Ahabanza")}
        className={`${!currentCategory ? "border-b-2 border-black pb-1" : "hover:border-b-2 hover:border-gray-300 pb-1"} cursor-pointer px-2 py-1 rounded text-lg`} // Increased font size
      >
        Ahabanza
      </p>
      {displayedCategories}
      <div className="hidden lg:flex items-center">
        <SearchBar />
      </div>
    </nav>
  );
};

export default CategoriesMenu;