import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="pb-20">
      <div className="flex justify-center items-center h-screen max-h-full containerpaddt ">
        <div className="max-h-screen">
          <SignIn path="/sign-in" />
        </div>
      </div>
    </div>
  );
}
