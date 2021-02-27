import Link from "next/link";

interface UnauthenticatedProps {
  callbackUrl: string;
}

const Unauthenticated = ({ callbackUrl }: UnauthenticatedProps) => {
  return (
    <div className="h-screen p-2 lg:p-10">
      You do not have permission to view this page.
      <Link href={callbackUrl}>
        <a>
          <p className="text-blue-500 underline">Sign in as admin?</p>
        </a>
      </Link>
    </div>
  );
};

export default Unauthenticated;
