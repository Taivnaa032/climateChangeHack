import instance from "@/lib/api";
import { useRouter } from "next/router";
import Cookie from "js-cookie";
import { RealPost } from "@/components/post/RealPost";

export default function SearchItems(props) {
  const { results, itemName } = props;
  const userType = Cookie.get("type");
  const uType = userType === "users" ? "receivers" : "users";
  return (
    <div className="md:ml-52 mt-24 ml-[5%] mr-[5%] flex flex-col">
      {results.length > 0 ? (
        <div className="flex flex-col gap-10">
          {uType === "receivers" ? (
            <p className="text-2xl">
              These receivers need &quot;{itemName}&quot;
            </p>
          ) : (
            <p className="text-2xl">These users have {itemName}</p>
          )}
          <div className="flex gap-5">
            {results.map((user, i) => (
              <RealPost user={user} key={i} />
            ))}
          </div>
        </div>
      ) : (
        <p className="text-black text-2xl">No {uType} found</p>
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    const { query } = context;
    const { userType, item, itemName } = query;

    const { data } = await instance.get(`/items/${userType}/${item}`);

    return {
      props: { results: data, itemName },
    };
  } catch (error) {
    console.error("Error fetching data:", error);

    return {
      props: {
        error: "Resource not found",
      },
    };
  }
}
