import { Link } from "react-router-dom";
import Delete from "../custom ui/Delete";
export const columns = [
  {
    accessorKey: "username",
    header: "Tên đăng nhập",
    cell: ({ row }) => (
      <Link to={`/customer/${row.original._id}`} className="hover:text-red-1">
        {row.original.username}
      </Link>
    ),
  },

  {
    accessorKey: "role",
    header: "Vai trò",
    cell: ({ row }) => <div>{row.original.role}</div>,
  },
  {
    accessorKey: "withDraw",
    header: "Số tiền hiện tại",
    cell: ({ row }) => (
      <div>{row.original.withDraw.toLocaleString("vi-VN") + "₫"}</div>
    ),
  },
  {
    header: "Xóa",
    id: "actions",
    cell: ({ row }) => <Delete item="customers" id={row.original._id} />,
  },
];
