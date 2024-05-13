import { UserProfile } from "@clerk/nextjs";

const UserProfilePage = () => (
    <div className="pb-20">
        <div className="flex justify-center items-center pt-28 ">
            <div>
                <UserProfile path="/user-profile" />
            </div>
        </div>
    </div>
);

export default UserProfilePage;