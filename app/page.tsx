/* eslint-disable react/no-unescaped-entities */
"use client";
import { useCallback, useEffect, useState } from "react";
import useSWRMutation from "swr/mutation";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { BuildingStorefrontIcon } from "@heroicons/react/24/solid";
import Map from "@/components/map";
import Button from "@/components/ui/button";
import Restaurant from "@/components/restaurant";
import RestaurantListModal from "@/components/restaurant-list-modal";
import Category, { PlaceType } from "@/components/categories";

export interface PlaceResult {
  next_page_token: string;
  results: google.maps.places.PlaceResult[];
}

const fetcher = (
  url: string,
  {
    arg: { lat, lng, nextPageToken, type = "restaurant" },
  }: {
    arg: { lat: number; lng: number; nextPageToken?: string; type?: PlaceType };
  },
) =>
  fetch(
    `${url}?lat=${lat}&lng=${lng}&next_page_token=${nextPageToken}&type=${type}`,
  ).then((res) => res.json() as Promise<PlaceResult>);

export default function Home() {
  const [coords, setCoords] = useState<
    | {
        lat: number;
        lng: number;
      }
    | undefined
  >();

  const [type, setType] = useState<PlaceType>("restaurant");
  const [random, setRadom] = useState<number>(-1);
  const [idList, setIdList] = useState<number[]>([]);

  const { trigger, data, error, isMutating } = useSWRMutation(
    `api/restaurantList`,
    fetcher,
  );

  const getNextPage = () => {
    if (coords && data) {
      trigger({
        lat: coords.lat,
        lng: coords.lng,
        nextPageToken: data.next_page_token,
      });
    }
  };

  const resetIdList = useCallback(
    (inputData?: PlaceResult) => {
      const _data = (inputData || data) ?? "";
      if (_data) {
        console.log(_data);
        const indexArr: number[] = [];
        const results = _data.results as google.maps.places.PlaceResult[];

        results.forEach((e, i) => {
          if (e.place_id) {
            indexArr.push(i);
          }
        });
        setIdList(indexArr);
        return indexArr;
      }
    },
    [data],
  );

  const onPick = () => {
    const pickRandom = (list?: number[]) => {
      const _list = list || idList;
      const length = _list.length;
      const randomPick = Math.floor(Math.random() * length);
      setRadom(_list[randomPick]);
      setIdList((prev) => {
        const newState = [...prev];
        newState.splice(randomPick, 1);
        return newState;
      });
    };

    if (data && idList.length) {
      pickRandom();
    } else if (coords?.lat && coords.lng && data?.next_page_token) {
      trigger({
        lat: coords.lat,
        lng: coords.lng,
        nextPageToken: data.next_page_token,
      }).then((res) => {
        const list = resetIdList(res);
        pickRandom(list);
      });
    }
  };

  const onGetCoords = (fn?: (lat: number, lng: number) => void) => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude: lat, longitude: lng } = position.coords;
      if (position.coords.latitude) {
        setCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        fn && fn(lat, lng);
      }
    });
  };

  const onClickCategory = (selected: PlaceType) => {
    if (coords) {
      setType(selected);
      trigger({
        lat: coords.lat,
        lng: coords.lng,
        type: selected,
      }).then((res) => {
        resetIdList(res);
      });
    }
  };

  // 1. get coords and start to fetch data
  useEffect(() => {
    if (!coords?.lat || !coords.lat) {
      onGetCoords((lat, lng) => {
        trigger({ lat, lng }).then((res) => {
          resetIdList(res);
        });
      });
    }
  }, [coords?.lat, resetIdList, trigger]);

  return (
    <main className="relative flex min-h-screen flex-col items-center gap-y-6 lg:gap-y-8">
      <header className="relative flex w-full items-center justify-between gap-4 px-4 py-4 md:py-2">
        <h3 className="text-xl font-medium ">Pick Food</h3>

        <RestaurantListModal
          data={data}
          onClickFetch={getNextPage}
          category={type}
        />
      </header>

      <div className="container relative flex flex-1 flex-col items-center gap-y-6">
        <Category type={type} onClick={onClickCategory} />
        <Restaurant data={data?.results[random]} />

        {error ? <p>{error}</p> : null}
      </div>
      <div className="sticky bottom-0 flex w-full flex-col items-center justify-center gap-x-4 gap-y-4 border-t border-white bg-white/30 px-4 py-4 backdrop-blur-sm sm:px-0 md:flex-row">
        <Button
          onClick={onPick}
          disabled={!coords}
          theme="primary"
          className="w-full sm:w-fit"
        >
          <div className="flex items-center justify-center gap-2 text-sm md:text-base">
            <BuildingStorefrontIcon className="h-5 w-5" />
            Pick {type}
          </div>
        </Button>
        <Button
          onClick={() => onGetCoords()}
          theme="secontary"
          className="w-full sm:w-fit "
        >
          <div className="flex items-center justify-center gap-2 text-sm md:text-base">
            <MapPinIcon className="h-5 w-5" />
            Refresh Location
          </div>
        </Button>
      </div>
    </main>
  );
}
