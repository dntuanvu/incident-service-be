import { useState, useEffect } from "react";

import { Layout, AddEdit } from "components/users";
import { Spinner } from "components";
import { userService, alertService } from "services";
import { incidentService } from "services/incident.service";

export default Edit;

function Edit({ id }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // fetch incident and set default form values if in edit mode
    incidentService
      .getById(id)
      .then((x) => setUser(x))
      .catch(alertService.error);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <h1>Edit Incident</h1>
      {user ? <AddEdit user={user} /> : <Spinner />}
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  return {
    props: { id: params.id },
  };
}
