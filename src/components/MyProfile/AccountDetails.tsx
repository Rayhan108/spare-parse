
const AccountDetails = () => {
    return (

        <div className="space-y-8" >
            <h2 className="text-xl font-medium">Account Details</h2>

            <div className=" flex justify-between">
                <div>
                    <h2>Login Details:</h2>
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
                    <button className=" px-12 py-3 rounded border border-primary cursor-pointer">Edit Account</button>
                </div>
            </div>

        </div>
    );
};

export default AccountDetails;