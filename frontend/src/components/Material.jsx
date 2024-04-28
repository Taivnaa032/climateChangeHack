import Image1 from "@/images/metals.png";
import Image2 from "@/images/plastics.png";
import Image3 from "@/images/papersCardboards.png";
import Image4 from "@/images/glasses.png";
import Image5 from "@/images/clothes.png";
import { useEffect, useState } from "react";
import instance from "@/lib/api";
import Image from "next/image";
import { useRouter } from "next/router";

export const Material = ({ type, userType }) => {
  const router = useRouter();
  const [materials, setMaterials] = useState();

  const uType = userType === "users" ? "receivers" : "users";

  useEffect(() => {
    const getMaterial = async () => {
      try {
        const { data } = await instance.get(`/materials/get/${type}`);
        setMaterials(data[0]);
      } catch (error) {
        console.log(error.message);
      }
    };
    getMaterial();
  }, []);

  const searchItems = async (id, itemName) => {
    router.push({
      pathname: "/search",
      query: {
        item: id,
        userType: uType,
        itemName,
      },
    });
  };

  const hangman = () => {
    switch (materials?._id) {
      case "65d9cc2352894d7eae492385":
        return Image1;
      case "65d9cbae52894d7eae492384":
        return Image2;
      case "65d9cc3d52894d7eae492386":
        return Image3;
      case "65d9cc6852894d7eae492387":
        return Image4;
      case "65d9cc8352894d7eae492388":
        return Image5;
    }
  };

  const imageUrl = hangman();

  return (
    <>
      <div className="md:w-1/5 relative group flex flex-row">
        <div className="w-full h-full  bg-cover flex flex-col items-center justify-center border border-gray-300 p-4 transition-all group-hover:border-slate-500">
          <Image src={imageUrl} alt="materials" />
          <p className="mt-2">{materials?.title}</p>
        </div>
        <div className="hidden absolute pl-2 top-[100]  w-full h-full bg-gray-800 bg-opacity-75 justify-center items-center text-white group-hover:flex">
          <ul className="flex flex-col items-center">
            {materials?.items?.map((item, i) => (
              <button key={i}>
                <li
                  onClick={() => searchItems(item?._id, item?.title)}
                  className="hover:underline cursor-pointer"
                >
                  {item?.title}
                </li>
              </button>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
