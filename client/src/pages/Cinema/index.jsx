import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import "video-react/dist/video-react.css";
import { apiGetCollection } from "@/services/collectionService";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Cinema = ({ currentData }) => {
  const [collections, setCollections] = useState([]);
  const getCollection = async () => {
    const data = await apiGetCollection();
    if (data.success) setCollections(data.collections);
  };
  useEffect(() => {
    getCollection();
  }, []);

  return (
    <div className="w-full h-screen overflow-y-hidden">
      <Tabs defaultValue="hot" className="w-full h-full">
        <div className="w-full bg-profileColor p-4 flex flex-col">
          <h3 className="text-center text-xl text-white pb-4">
            Rạp Chiếu Phim
          </h3>
          <TabsList className="w-full flex overflow-x-scroll">
            <TabsTrigger className="text-sm text-white" value="hot">
              Phim hot
            </TabsTrigger>
            <TabsTrigger className="text-sm text-white" value="vn">
              Việt Nam
            </TabsTrigger>
            <TabsTrigger className="text-sm text-white" value="jp">
              Nhật Bản
            </TabsTrigger>
            <TabsTrigger className="text-sm text-white" value="hk">
              Hong Kong
            </TabsTrigger>
            <TabsTrigger className="text-sm text-white" value="gay">
              Gay
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="hot">
          <div className="grid grid-cols-2 pl-3">
            {collections
              ?.filter((fill) => fill?.category?.includes("hot"))
              ?.map((collection) => (
                <>
                  <div className="relative mb-4  w-[180px]  h-[153px]">
                    <Link
                      key={collection?._id}
                      to={`/video/${collection?.title.replace(/ /g, "_")}/${
                        collection?._id
                      }/${currentData?._id}`}
                    >
                      <img
                        // src={`http://localhost:8080/images/${collection.image}`}
                        src={`https://sexyloveeu.com/images/${collection?.image}`}
                        className="w-full h-full rounded-xl"
                        alt=""
                      />
                      <div className="absolute w-full px-4 text-white  bg-[rgba(0,0,0,.4)] bottom-0 z-0 flex items-center justify-between">
                        <span>{collection.title}</span>
                        <span>Xem: {collection?.view?.length}</span>
                      </div>
                    </Link>
                  </div>
                </>
              ))}
          </div>
        </TabsContent>
        <TabsContent value="vn">
          <div className="grid grid-cols-2 pl-3">
            {collections
              ?.filter((fill) => fill?.category?.includes("vn"))
              ?.map((collection) => (
                <>
                  <div className="relative mb-4  w-[180px]  h-[153px]">
                    <Link
                      key={collection?._id}
                      to={`/video/${collection?.title.replace(/ /g, "_")}/${
                        collection?._id
                      }/${currentData?._id}`}
                    >
                      <img
                        // src={`http://localhost:8080/images/${collection.image}`}
                        src={`https://sexyloveeu.com/images/${collection?.image}`}
                        className="w-full h-full rounded-xl"
                        alt=""
                      />
                      <div className="absolute w-full px-4 text-white  bg-[rgba(0,0,0,.4)] bottom-0 z-0 flex items-center justify-between">
                        <span>{collection.title}</span>
                        <span>Xem: {collection?.view?.length}</span>
                      </div>
                    </Link>
                  </div>
                </>
              ))}
          </div>
        </TabsContent>
        <TabsContent value="jp">
          <div className="grid grid-cols-2 pl-3">
            {collections
              ?.filter((fill) => fill?.category?.includes("jp"))
              ?.map((collection) => (
                <>
                  <div className="relative mb-4  w-[180px]  h-[153px]">
                    <Link
                      key={collection?._id}
                      to={`/video/${collection?.title.replace(/ /g, "_")}/${
                        collection?._id
                      }/${currentData?._id}`}
                    >
                      <img
                        // src={`http://localhost:8080/images/${collection.image}`}
                        src={`https://sexyloveeu.com/images/${collection?.image}`}
                        className="w-full h-full rounded-xl"
                        alt=""
                      />
                      <div className="absolute w-full px-4 text-white  bg-[rgba(0,0,0,.4)] bottom-0 z-0 flex items-center justify-between">
                        <span>{collection.title}</span>
                        <span>Xem: {collection?.view?.length}</span>
                      </div>
                    </Link>
                  </div>
                </>
              ))}
          </div>
        </TabsContent>
        <TabsContent value="hk">
          <div className="grid grid-cols-2 pl-3">
            {collections
              ?.filter((fill) => fill?.category?.includes("hk"))
              ?.map((collection) => (
                <>
                  <div className="relative mb-4  w-[180px]  h-[153px]">
                    <Link
                      key={collection?._id}
                      to={`/video/${collection?.title.replace(/ /g, "_")}/${
                        collection?._id
                      }/${currentData?._id}`}
                    >
                      <img
                        // src={`http://localhost:8080/images/${collection.image}`}
                        src={`https://sexyloveeu.com/images/${collection?.image}`}
                        className="w-full h-full rounded-xl"
                        alt=""
                      />
                      <div className="absolute w-full px-4 text-white  bg-[rgba(0,0,0,.4)] bottom-0 z-0 flex items-center justify-between">
                        <span>{collection.title}</span>
                        <span>Xem: {collection?.view?.length}</span>
                      </div>
                    </Link>
                  </div>
                </>
              ))}
          </div>
        </TabsContent>
        <TabsContent value="gay">
          {" "}
          <div className="grid grid-cols-2 pl-3">
            {collections
              ?.filter((fill) => fill?.category?.includes("gay"))
              ?.map((collection) => (
                <>
                  <div className="relative mb-4  w-[180px]  h-[153px]">
                    <Link
                      key={collection?._id}
                      to={`/video/${collection?.title.replace(/ /g, "_")}/${
                        collection?._id
                      }/${currentData?._id}`}
                    >
                      <img
                        // src={`http://localhost:8080/images/${collection.image}`}
                        src={`https://sexyloveeu.com/images/${collection?.image}`}
                        className="w-full h-full rounded-xl"
                        alt=""
                      />
                      <div className="absolute w-full px-4 text-white  bg-[rgba(0,0,0,.4)] bottom-0 z-0 flex items-center justify-between">
                        <span>{collection.title}</span>
                        <span>Xem: {collection?.view?.length}</span>
                      </div>
                    </Link>
                  </div>
                </>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Cinema;
