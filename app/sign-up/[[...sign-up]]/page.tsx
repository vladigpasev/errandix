import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="pb-20">
      <div className="flex justify-center items-center h-screen max-h-full containerpaddt ">
        <div className="max-h-screen">
          <SignUp path="/sign-up" />
        </div>
      </div>
    </div>
  );
}
