
const AccountDetails = () => {
    return (

        <div className="space-y-8" >
            <h2 className="text-xl font-medium">Account Details</h2>

            <div className=" grid gap-8 sm:gap-0 sm:grid-cols-3">
                <div>
                    <h2 className=" text-lg font-semibold">Login Details:</h2>
                </div>
                <div>
                    <div className=" mb-5">
                        <p>Full Name</p>
                        <p>Leslie Alexander</p>
                    </div>
                    <div className=" mb-5">
                        <p>Email</p>
                        <p>debra.holt@example.com</p>
                    </div>
                    <div>
                        <p>Phone Number</p>
                        <p>(208) 555-0112</p>
                    </div>
                </div>
                <div>
                    <button className=" w-[200px] py-3 rounded border border-primary cursor-pointer">Edit Account</button>
                </div>
            </div>

            <div className=" grid  gap-8 sm:gap-0 sm:grid-cols-3 ">
                <div>
                    <h2 className=" text-lg font-semibold">Password:</h2>
                </div>
                <div>
                    <div className=" mb-5">
                        <p>Current Password</p>
                        <p>********</p>
                    </div>
                </div>
                <div>
                    <button className=" w-[200px] py-3 rounded border border-primary cursor-pointer">Change Password</button>
                </div>
            </div>

            <div className=" grid  gap-8 sm:gap-0 sm:grid-cols-3">
                <div>
                    <h2 className=" text-lg font-semibold">Address Book:</h2>
                </div>
                <div>
                    <div className=" mb-5">
                        <p className=" mb-2">Shipping Address</p>
                        <p>2118 Thornridge Syracuse,</p>
                        <p>Connecticut 35624</p>
                    </div>
                </div>
                <div>
                    <button className=" w-[200px] py-3 rounded border border-primary cursor-pointer">Change Address</button>
                </div>
            </div>

        </div>
    );
};

export default AccountDetails;