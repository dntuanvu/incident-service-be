import { useState, useEffect } from "react";

import { Layout } from "components/users";
import { Assign } from "components/incident/Assign";
import { Spinner } from "components";
import { userService, alertService } from "services";
import { incidentService } from "services/incident.service";

export default AssignIncident;

function AssignIncident({ id }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // fetch user and set default form values if in edit mode
    incidentService
      .getById(id)
      .then((x) => setUser(x))
      .catch(alertService.error);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <h1>Assign Incident</h1>
      {user ? <Assign user={user} /> : <Spinner />}
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  return {
    props: { id: params.id },
  };
}
