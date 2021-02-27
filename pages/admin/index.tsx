import Link from "next/link";
import { Unauthenticated } from "@components/admin";
import { GetServerSideProps } from "next";
import { useSession, getSession } from "next-auth/client";

const index = () => {
  const [session, loading] = useSession();
  if (typeof window !== undefined && loading)
    return <div className="min-h-screen"></div>;

  if (!session) {
    return (
      <Unauthenticated
        callbackUrl={`/auth/signin?callbackUrl=${process.env.NEXT_PUBLIC_SITE_URL}/admin`}
      />
    );
  }

  return (
    <div className="h-screen">
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  return {
    props: { session },
  };
};

export default index;
