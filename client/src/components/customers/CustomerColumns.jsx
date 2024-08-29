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
    accessorKey: "password",
    header: "Mật khẩu",
    cell: ({ row }) => <div>{row.original.password}</div>,
  },
  {
    accessorKey: "role",
    header: "Vai trò",
    cell: ({ row }) => <div>{row.original.role}</div>,
  },
  {
    header: "Xóa",
    id: "actions",
    cell: ({ row }) => <Delete item="collection" id={row.original._id} />,
  },
];
