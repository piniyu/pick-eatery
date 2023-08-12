import { PlaceResult } from "@/app/page";
import Modal from "@/components/ui/modal";
import { ArrowPathIcon, ListBulletIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";

const triggerBtn = (category: string) => (
  <div className="flex items-center gap-2">
    <ListBulletIcon className="h-7 w-7" />
    <span className="hidden capitalize sm:block">{category} List</span>
  </div>
);

const footer = (onClickFetch: () => void) => (
  <div className="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
    <button
      type="button"
      className="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
      data-te-modal-dismiss
      data-te-ripple-init
      data-te-ripple-color="light"
    >
      Close
    </button>
    <button
      type="button"
      className="ml-1 flex items-center gap-2 rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
      data-te-ripple-init
      data-te-ripple-color="light"
      onClick={onClickFetch}
    >
      <ArrowPathIcon className="h-5 w-5" />
      Next List
    </button>
  </div>
);

export default function RestaurantListModal({
  data,
  onClickFetch,
  category,
}: {
  data: PlaceResult | undefined;
  onClickFetch: () => void;
  category: string;
}) {
  return (
    <Modal
      btnElement={triggerBtn(category)}
      title={`${category} List`}
      disabled={!data}
      footer={footer(onClickFetch)}
    >
      <ul className="divide-y text-gray-700">
        {data?.results.map((item) => (
          <li key={item.place_id}>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${Object.values(
                item?.geometry?.location ?? {},
              ).toString()}&query_place_id=${item.place_id}`}
              target="_blank"
              className="link flex justify-between py-4 text-inherit"
            >
              {item.name}
              <span className="flex">
                {item.rating}
                <StarIcon
                  className={` h-6 w-6 ${
                    item.rating ?? 0 >= 4
                      ? "text-yellow-400"
                      : item?.rating ?? 0 >= 3
                      ? "text-blue-400"
                      : "text-red-400"
                  } `}
                />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </Modal>
  );
}
