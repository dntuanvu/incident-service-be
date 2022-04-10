import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Link, Spinner } from "components";
import { Layout } from "components/users";
import { incidentService } from "services/incident.service";
import { alertService } from "services";

export default Index;

function Index() {
  const [users, setUsers] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const router = useRouter();

  useEffect(() => {
    console.log("manage incident, role=" + user.role);
    if (user.role === "admin") {
      incidentService.getAll().then((x) => {
        setUsers(x.incidents);
      });
    } else {
      incidentService.getAllByAssignee(user.id).then((x) => {
        setUsers(x.incidents);
      });
    }
  }, []);

  /*
  <Link
    href={`/incidents/edit/${user.id}`}
    className="btn btn-sm btn-primary mr-1"
  >
    Edit
  </Link>
  <button
    onClick={() => deleteUser(user.id)}
    className="btn btn-sm btn-danger btn-delete-user"
    disabled={user.isDeleting}
  >
    {user.isDeleting ? (
      <span className="spinner-border spinner-border-sm"></span>
    ) : (
      <span>Delete</span>
    )}
  </button>
  */

  const acknowledge = (incident_id) => {
    const body = {
      incident_id: incident_id,
    };

    return incidentService
      .acknowledgeIncident(body)
      .then(() => {
        alertService.success("User acknowledged", {
          keepAfterRouteChange: false,
        });
        router.push("/incidents");
      })
      .catch(alertService.error);
  };

  const resolve = (incident_id) => {
    const body = {
      incident_id: incident_id,
    };

    return incidentService
      .resolveIncident(body)
      .then(() => {
        alertService.success("User resolved", { keepAfterRouteChange: false });
        router.push("/incidents");
      })
      .catch(alertService.error);
  };

  const renderActionButton = (incident) => {
    if (user.role === "admin") {
      return (
        <>
          <Link
            href={`/incidents/assign/${incident.id}`}
            className="btn btn-sm btn-info mr-1"
          >
            Assign
          </Link>
        </>
      );
    } else {
      return (
        <>
          <button
            onClick={() => acknowledge(incident.id)}
            className="btn btn-sm btn-primary mr-1"
          >
            Acknowledge
          </button>
          <button
            onClick={() => resolve(incident.id)}
            className="btn btn-sm btn-success mr-1"
          >
            Resolve
          </button>
        </>
      );
    }
  };

  function deleteUser(id) {
    setUsers(
      users.map((x) => {
        if (x.id === id) {
          x.isDeleting = true;
        }
        return x;
      })
    );
    incidentService.delete(id).then(() => {
      setUsers((users) => users.filter((x) => x.id !== id));
    });
  }

  const renderAddButton = () => {
    if (user.role === "admin") {
      return (
        <Link href="/incidents/add" className="btn btn-sm btn-success mb-2">
          Add Incident
        </Link>
      );
    } else {
      return <></>;
    }
  };

  return (
    <Layout>
      <h1>Incidents</h1>
      {renderAddButton()}
      <table className="table table-striped">
        <thead>
          <tr>
            <th style={{ width: "30%" }}>Type</th>
            <th style={{ width: "30%" }}>Detail</th>
            <th style={{ width: "30%" }}>Assignee</th>
            <th style={{ width: "30%" }}>Created</th>
            <th style={{ width: "30%" }}>Status</th>
            <th style={{ width: "10%" }}></th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((incident) => (
              <tr key={incident.id}>
                <td>{incident.type}</td>
                <td>{incident.detail}</td>
                <td>{incident.assignee}</td>
                <td>{incident.created_at}</td>
                <td>
                  {incident.resolved_at !== undefined &&
                  incident.resolved_at !== null
                    ? "Resolved"
                    : incident.acknowledged_at !== null
                    ? "Acknowledged"
                    : ""}
                </td>
                <td style={{ whiteSpace: "nowrap" }}>
                  {renderActionButton(incident)}
                </td>
              </tr>
            ))}
          {!users && (
            <tr>
              <td colSpan="4">
                <Spinner />
              </td>
            </tr>
          )}
          {users && !users.length && (
            <tr>
              <td colSpan="4" className="text-center">
                <div className="p-2">No Incidents To Display</div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </Layout>
  );
}
