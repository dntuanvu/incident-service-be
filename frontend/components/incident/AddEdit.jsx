import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { Link } from "components";
import { userService, alertService } from "services";
import { incidentService } from "services/incident.service";

export { AddEdit };

function AddEdit(props) {
  const user = props?.user;
  const isAddMode = !user;
  const router = useRouter();

  // form validation rules
  const validationSchema = Yup.object().shape({
    type: Yup.string().required("Type is required"),
    detail: Yup.string().required("Detail is required"),
    /*username: Yup.string()
            .required(' is required'),
        password: Yup.string()
            .transform(x => x === '' ? undefined : x)
            .concat(isAddMode ? Yup.string().required('Password is required') : null)
            .min(6, 'Password must be at least 6 characters')*/
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
    return createIncident(data);
  }

  function createIncident(data) {
    return incidentService
      .createIncident(data)
      .then(() => {
        alertService.success("Incident raised", { keepAfterRouteChange: true });
        router.push(".");
      })
      .catch(alertService.error);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-row">
        <div className="form-group col">
          <label>Type of Incident</label>
          <input
            name="type"
            type="text"
            {...register("type")}
            className={`form-control ${errors.type ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.type?.message}</div>
        </div>
        <div className="form-group col">
          <label>Detail of Incident</label>
          <input
            name="detail"
            type="text"
            {...register("detail")}
            className={`form-control ${errors.detail ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.detail?.message}</div>
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
        <button
          onClick={() => reset(formOptions.defaultValues)}
          type="button"
          disabled={formState.isSubmitting}
          className="btn btn-secondary"
        >
          Reset
        </button>
        <Link href="/incidents" className="btn btn-link">
          Cancel
        </Link>
      </div>
    </form>
  );
}
