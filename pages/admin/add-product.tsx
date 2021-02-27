import { GetServerSideProps } from "next";
import { useSession, getSession } from "next-auth/client";
import { AddProduct, Unauthenticated } from "@components/admin";

const AddProductPage = () => {
  const [session, loading] = useSession();
  if (typeof window !== undefined && loading) {
    return <div className="min-h-screen"></div>;
  }

  if (!session) {
    return (
      <Unauthenticated
        callbackUrl={`/auth/signin?callbackUrl=${process.env.NEXT_PUBLIC_SITE_URL}/admin/add-product`}
      />
    );
  }
  return <AddProduct />;
};

export default AddProductPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  return {
    props: { session },
  };
};
