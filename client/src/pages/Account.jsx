import { useQuery } from "@apollo/client";
import { GET_ME } from "../utils/queries";
function AccountPage() {
  const { data } = useQuery(GET_ME);
  const Me = data ? data : {};
  console.log(Me);
  return (
    <>
      <h2>Account page</h2>
    </>
  );
}

export default AccountPage;
