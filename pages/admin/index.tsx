import Link from "next/link";

interface Props {}

const index = ({}: Props) => {
  return (
    <div>
      <ul>
        <li>
          <Link href="/admin/add-product">
            <a>Add product</a>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default index;
