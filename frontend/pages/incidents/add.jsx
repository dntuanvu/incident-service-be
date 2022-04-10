import { Layout } from "components/users";
import { AddEdit } from "components/incident/AddEdit";

export default Add;

function Add() {
  return (
    <Layout>
      <h1>Raise Incident</h1>
      <AddEdit />
    </Layout>
  );
}
