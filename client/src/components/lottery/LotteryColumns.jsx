import { Link } from "react-router-dom";
import Delete from "../custom ui/Delete";

export const columns = [
  {
    accessorKey: "room",
    header: "Phòng",
    cell: ({ row }) => (
      <Link to={`/room/${row.original?.room}`} className="hover:text-red-1">
        {row.original.room}
      </Link>
    ),
  },

  {
    id: "actions",
    header: "Xóa",
    cell: ({ row }) => <Delete item="lottery" id={row.original._id} />,
  },
];
