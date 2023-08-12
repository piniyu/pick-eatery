import { StarIcon, BuildingStorefrontIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const LG_IMG_WIDTH = 500;
const MD_IMG_WIDTH = 500;
const SM_IMG_WIDTH = 320;

export default function Restaurant({ data }: { data: any }) {
  const windowWidth = window
    ? window.innerWidth > 1023
      ? "lg"
      : window.innerWidth > 767
      ? "md"
      : "sm"
    : undefined;
  const imgWidth = windowWidth
    ? windowWidth === "lg"
      ? LG_IMG_WIDTH
      : windowWidth === "md"
      ? MD_IMG_WIDTH
      : SM_IMG_WIDTH
    : 0;
  const imgHeight = (imgWidth * 3) / 4;
  // const [imgWidth, setImgWidth] = useState(windowWidth && windowWidth ==='lg'?500)
  if (!data) {
    return (
      <div className="mt-[10%] flex items-center justify-center">
        <h1 className="text-center text-4xl font-bold sm:text-6xl">
          You have not
          <br />
          picked anythig!
          <br />
          <br />
          Click to pick
          <br />
          <br />↓
        </h1>
      </div>
    );
  }

  return (
    <>
      {data ? (
        <div className="card-shadow flex w-fit flex-col items-center gap-2 overflow-hidden rounded-xl border-l border-t border-white/70 bg-white/40 py-3 lg:gap-4 lg:pb-4 lg:pt-5">
          <h1 className="line-clamp-1 w-full min-w-0 px-4 text-center text-xl">
            {data.name}
          </h1>
          <p className="flex items-center">
            {Math.round(data.rating) > 0 &&
              Array(Math.round(data.rating))
                .fill(0)
                .map((_, i) => (
                  <StarIcon
                    key={i}
                    className={`h-4 w-4 lg:h-6 lg:w-6 ${
                      data.rating >= 4
                        ? "text-yellow-500"
                        : data.rating >= 3
                        ? "text-blue-400"
                        : "text-red-400"
                    } `}
                  />
                ))}
            <span className="ml-1">{data.rating}</span>
          </p>
          <div className=" ">
            <Image
              src={`https://maps.googleapis.com/maps/api/place/photo?photo_reference=${data.photos[0].photo_reference}&maxwidth=${imgWidth}&maxheight=${imgHeight}&key=${process.env.MAP_API_KEY}`}
              alt="icon"
              width={imgWidth}
              height={imgHeight}
              className="aspect-4/3 object-cover object-center  "
            />
          </div>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${Object.values(
              data.geometry.location,
            ).toString()}&query_place_id=${data.place_id}`}
            className="link"
            target="_blank"
          >
            Google map
            <ArrowTopRightOnSquareIcon className="h-5 w-5" />
          </a>
        </div>
      ) : null}
    </>
  );
}
