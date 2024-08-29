import { Link } from "react-router-dom";
import Delete from "../custom ui/Delete";
export const columns = [
  {
    accessorKey: "title",
    header: "Tên phim",
    cell: ({ row }) => (
      <Link to={`/collection/${row.original._id}`} className="hover:text-red-1">
        {row.original.title}
      </Link>
    ),
  },
  {
    accessorKey: "category",
    header: "Thể loại phim",
    cell: ({ row }) => <div>{row.original.category}</div>,
  },
  {
    header: "Xóa",
    id: "actions",
    cell: ({ row }) => <Delete item="collection" id={row.original._id} />,
  },
];
