import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { Link } from "components";
import { userService, alertService } from "services";
import { incidentService } from "services/incident.service";

export { Assign };

function Assign(props) {
  const user = props?.user;
  const isAddMode = !user;
  const router = useRouter();

  const [users, setUsers] = useState([]);
  useEffect(() => {
    userService.getAll().then((x) => setUsers(x.users));
    createSelectItems();
  }, []);

  const createSelectItems = () => {
    let items = [];
    console.log(JSON.stringify(users));
    if (users.length > 0) {
      users.forEach(function (arrayItem) {
        if (arrayItem.role !== "admin") {
          items.push(
            <option key={arrayItem.id} value={arrayItem.id}>
              {arrayItem.username}
            </option>
          );
        }
      });
    }

    return items;
  };

  // form validation rules
  const validationSchema = Yup.object().shape({
    assignee: Yup.string().required("Assignee is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // set default form values if in edit mode
  if (!isAddMode) {
    formOptions.defaultValues = props.user;
  }

  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit(data) {
    //return incidentService.assignIncident(user.id, data);
    console.log("assign incident, data=" + JSON.stringify(data));
    const body = {
      incident_id: data.incident.id,
      assignee: data.assignee,
    };
    return incidentService
      .assignIncident(body)
      .then(() => {
        alertService.success("User assigned", { keepAfterRouteChange: false });
        router.push("/incidents");
      })
      .catch(alertService.error);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-row">
        <div className="form-group">
          <label>Assignee of Incident</label>
          <select
            name="assignee"
            id="assignee"
            {...register("assignee")}
            className={`form-control ${errors.assignee ? "is-invalid" : ""}`}
          >
            {createSelectItems()}
          </select>
          <div className="invalid-feedback">{errors.type?.message}</div>
        </div>
      </div>

      <div className="form-group">
        <button
          type="submit"
          disabled={formState.isSubmitting}
          className="btn btn-primary mr-2"
        >
          {formState.isSubmitting && (
            <span className="spinner-border spinner-border-sm mr-1"></span>
          )}
          Save
        </button>
        <Link href="/incidents" className="btn btn-link">
          Cancel
        </Link>
      </div>
    </form>
  );
}
