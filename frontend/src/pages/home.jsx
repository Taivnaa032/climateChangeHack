import Image from "next/image";
import PlasticsImage from "./images/plastics.png";
import PapersCardboardsImage from "./images/papersCardboards.png";
import MetalsImage from './images/metals.png'
import GlassesImage from './images/glasses.png'
import ClothesImage from './images/clothes.png'
import PostReceiver from "./postReceiver";
import PostUser from "./postUser";

const Home = () => {
    return (
        <div className="md:ml-52 mt-24 ml-[5%] mr-[5%] ">
            <h1 className="text-center text-2xl text-white font-semibold">Recyclable Materials</h1>
            <div className="flex flex-col justify-evenly bg-slate-200 mt-5 md:flex-row" >
                <div className="md:w-1/5 relative group">
                    {/* Main div */}
                    <div className="w-full h-full  bg-cover flex flex-col items-center justify-center border border-gray-300 p-4 transition-all group-hover:border-slate-500">
                        <Image src={PlasticsImage} alt="Plastics" />
                        <p className="mt-2">Plastics</p>
                    </div>
                    {/* Hidden div - appears on hover */}
                    <div className="hidden absolute pl-2 top-0 md:top-[20rem] w-full h-1/2 bg-gray-800 bg-opacity-75 justify-center items-center text-white group-hover:flex">
                        <ul>
                            <li>Plastic food containers & lids</li>
                            <li>Plastic bottles (all colors)</li>
                            <li>Plastic plant pots</li>
                            <li>Pill bottles (remove personal information)</li>
                        </ul>
                    </div>
                </div>
                <div className="md:w-1/5 relative group">
                    {/* Main div */}
                    <div className="w-full h-full  bg-cover flex flex-col items-center justify-center border border-gray-300 p-4 transition-all group-hover:border-slate-500">
                        <Image src={PapersCardboardsImage} alt="Plastics" />
                        <p className="mt-2">Papers & Cardboards</p>
                    </div>
                    {/* Hidden div - appears on hover */}
                    <div className="hidden absolute pl-2 top-0 md:top-[20rem] w-full h-1/2 bg-gray-800 bg-opacity-75 justify-center items-center text-white group-hover:flex">
                        <ul>
                            <li>Boxes & Cartons</li>
                            <li>Paper & Plastic Cups</li>
                            <li>Newspaper & Damaged books</li>
                            <li>Flattened Carboards etc.</li>
                        </ul>
                    </div>
                </div><div className="md:w-1/5 relative group">
                    {/* Main div */}
                    <div className="w-full h-full  bg-cover flex flex-col items-center justify-center border border-gray-300 p-4 transition-all group-hover:border-slate-500">
                        <Image src={MetalsImage} alt="Plastics" />
                        <p className="mt-2">Metals</p>
                    </div>
                    {/* Hidden div - appears on hover */}
                    <div className="hidden absolute pl-2 top-0 md:top-[20rem] w-full h-1/2 bg-gray-800 bg-opacity-75 justify-center items-center text-white group-hover:flex">
                        <ul>
                            <li>Aliminum & Metal cans</li>
                            <li>Foll & Foll trays</li>
                            <li>Lids</li>
                            <li>Electronics</li>
                            <li>Aerosol spray cans (must be empty)etc.</li>
                        </ul>
                    </div>
                </div><div className="md:w-1/5 relative group">
                    {/* Main div */}
                    <div className="w-full h-full  bg-cover flex flex-col items-center justify-center border border-gray-300 p-4 transition-all group-hover:border-slate-500">
                        <Image src={GlassesImage} alt="Plastics" />
                        <p className="mt-2">Glasses</p>
                    </div>
                    {/* Hidden div - appears on hover */}
                    <div className="hidden absolute pl-2 top-0 md:top-[20rem] w-full h-1/2 bg-gray-800 bg-opacity-75 justify-center items-center text-white group-hover:flex">
                        <ul>
                            <li>Bottles</li>
                            <li>Jars</li>
                            <li>Jugs</li>
                        </ul>
                    </div>
                </div><div className="md:w-1/5 relative group">
                    {/* Main div */}
                    <div className="w-full h-full  bg-cover flex flex-col items-center justify-center border border-gray-300 p-4 transition-all group-hover:border-slate-500">
                        <Image src={ClothesImage} alt="Plastics" />
                        <p className="mt-2">Clothes & Similar materials</p>
                    </div>
                    {/* Hidden div - appears on hover */}
                    <div className="hidden absolute pl-2 top-0 md:top-[20rem] w-full h-1/2 bg-gray-800 bg-opacity-75 justify-center items-center text-white group-hover:flex">
                        <ul>
                            <li>Backpack etc.</li>
                        </ul>
                    </div>
                </div>


            </div>
            <div className="grid grid-cols-3 gap-5">
                <PostReceiver />
                <PostUser />
            </div>
        </div>
    );
}

export default Home;
