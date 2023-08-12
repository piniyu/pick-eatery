import Button from "./ui/button";

export type PlaceType = "restaurant" | "cafe";

export default function Category({
  type,
  onClick,
}: {
  type: PlaceType;
  onClick: (type: PlaceType) => void;
}) {
  // const [type, setType] = useState<PlaceType>('restaurant')

  // useEffect(() => {
  // 	onClick(type)
  // }, [onClick, type])

  return (
    <div className="flex gap-4">
      <Button
        theme={type === "restaurant" ? "primary" : "secontary"}
        className="rounded-full"
        onClick={() => onClick("restaurant")}
      >
        Restaurant
      </Button>
      <Button
        theme={type === "cafe" ? "primary" : "secontary"}
        className="rounded-full"
        onClick={() => onClick("cafe")}
      >
        Cafe
      </Button>
    </div>
  );
}
