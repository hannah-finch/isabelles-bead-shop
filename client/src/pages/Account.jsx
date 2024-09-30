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

/** If it's not used, get rid of it. Any stuff left hanging around just
 * clutters up the place and potentially adds vulnerabilities because
 * it's not on the radar for testing/maintenance, etc. 
 */
