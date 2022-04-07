import React, { useState, useEffect } from 'react';
import useToken from '../App/useToken';
import axios from 'axios';

import DataTable from 'react-data-table-component';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import 'bootstrap/dist/css/bootstrap.css';

import { DropdownButton, Dropdown } from 'react-bootstrap'

export default function Dashboard() {
  const [listIncident, setListIncident] = useState([]);
  const token = useToken();

  const accessToken = token.token.replace(/['"]+/g, '');
  const url = 'http://localhost:8080/incident/all';

  const getAllIncidents = () => {
    axios
      .get(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log('getAllIncidents, data=' + JSON.stringify(response));
        setListIncident(response.data.incidents);
      });
  };

  const [selectedRow, setSelectedRow] = useState('')
  const [assignee, setAssignee] = useState('')

  const handleRowChange = (e) => {
    setSelectedRow(e.target.id);
    console.log("selectedRow=" + selectedRow);
  }

  const selectAssigneeHandler = (e) => {
    setAssignee(e.target.value)
  }

  const assignHandler = () => {
    console.log("Assign To User assignee=" + assignee + "; incident=" +  selectedRow + "; accessToken=" + accessToken)
    
    const url = "http://localhost:8080/incident/assign"
    const data = { 
      incident_id: selectedRow, 
      assignee: assignee
    };
    axios
      .post(url, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        }
      })
      .then((response) => {
        console.log('assignToUser, data=' + JSON.stringify(response));
        window.location.reload(true);
      });
  }
  
  const acknowledgeHandler = () => {
    console.log("Acknowledge Incident")
    const url = "http://localhost:8080/incident/acknowledge"
    const data = { 
      incident_id: selectedRow
    };
    axios
      .post(url, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        }
      })
      .then((response) => {
        console.log('assignToUser, data=' + JSON.stringify(response));
        window.location.reload(true);
      });
  }

  const resolveHandler = () => {
    console.log("Resolve Incident")
    const url = "http://localhost:8080/incident/resolve"
    const data = { 
      incident_id: selectedRow
    };
    axios
      .post(url, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        }
      })
      .then((response) => {
        console.log('assignToUser, data=' + JSON.stringify(response));
        window.location.reload(true);
      });
  }

  const deleteIncidentHandler = () => {
    console.log("Assign To User assignee=" + assignee + "; incident=" +  selectedRow + "; accessToken=" + accessToken)
    
    const url = "http://localhost:8080/incident/" + selectedRow
    axios
      .delete(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        }
      })
      .then((response) => {
        console.log('deleteIncident, data=' + JSON.stringify(response));
        window.location.reload(true);
      });
  }

  useEffect(() => {
    getAllIncidents();
  }, []);

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id, 
      sortable: false,
      hidden: true 
    },
    {
      name: 'Type',
      selector: (row) => row.type,
      sortable: true,
    },
    {
      name: 'Detail',
      selector: (row) => row.detail,
      sortable: true,
      grow: 4
    },
    {
      name: 'Assignee',
      selector: (row) => row.assignee,
      sortable: true,
      grow: 3
    },
    {
      name: 'Status',
      selector: (row) => (row.resolved_at !== undefined && row.resolved_at !== null) ? "Resolved" : (row.acknowledged_at !== null ? "Acknowledged" : "") ,
      sortable: true,
      grow: 2
    },
    {
      name: 'Created By',
      selector: (row) => row.created_by,
      sortable: true,
      grow: 3
    },
    {
      name: 'Created At',
      selector: (row) => row.created_at,
      sortable: true,
      grow: 2
    },
    {
      button: true,
      cell: (row) => (
        <div className="App">
          <div class="openbtn text-center">
            <button
              type="button"
              class="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#myModal"
              onClick={handleRowChange}
              id={row.id}>Action</button>
            
            <div class="modal" tabindex="-1" id="myModal">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title">Modal title</h5>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body">
                    <p>
                      <input type="text" name="assignee" class="btn btn-outline-secondary" onChange={selectAssigneeHandler}/>
                      <button class="btn btn-secondary" onClick={assignHandler}>Assign</button>
                    </p>
                    <p>
                      <button class="btn btn-secondary" onClick={acknowledgeHandler}>Acknowledge</button>
                    </p>
                    <p>
                      <button class="btn btn-secondary" onClick={resolveHandler}>Resolve</button>
                    </p>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-danger" onClick={deleteIncidentHandler}>
                      Delete
                    </button>
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-bs-dismiss="modal">
                      Close
                    </button>
                    <button type="button" class="btn btn-primary">
                      Save changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const [newIncidentType, setNewIncidentType] = useState('')
  const [newIncidentDetail, setNewIncidentDetail] = useState('')
  const newIncidentTypeHandler = (e) => {
    setNewIncidentType(e.target.value)
  }

  const newIncidentDetailHandler = (e) => {
    setNewIncidentDetail(e.target.value)
  }

  const createNewIncidentHandler = () => {
    const url = "http://localhost:8080/incident/raise"
    const data = { 
      type: newIncidentType, 
      detail: newIncidentDetail
    };
    axios
      .post(url, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        }
      })
      .then((response) => {
        console.log('assignToUser, data=' + JSON.stringify(response));
        window.location.reload(true);
      });
  }

  return (
    <div className="App">
      <div className="card">
        <DataTable
          title="All Incidents"
          columns={columns}
          data={listIncident}
          defaultSortFieldID={1}
          pagination
          paginationComponent={BootyPagination}
          selectableRows
          selectableRowsComponent={BootyCheckbox}
          onRowSelected={handleRowChange}
        />

          <button
            type="button"
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#myModalNew"
            onClick={handleRowChange}>Create New Incident</button>
      </div>

      <div class="modal" tabindex="-1" id="myModalNew">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Create new Incident</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <p>
                <input type="text" name="assignee" class="btn btn-outline-secondary" onChange={newIncidentTypeHandler} placeholder="Incident Type"/>
                </p>
              <p>
                <input type="text" name="assignee" class="btn btn-outline-secondary" onChange={newIncidentDetailHandler} placeholder="Detail"/>
              </p>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" class="btn btn-primary" onClick={createNewIncidentHandler}>
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}

const BootyPagination = ({
  rowsPerPage,
  rowCount,
  onChangePage,
  onChangeRowsPerPage, // available but not used here
  currentPage,
}) => {
  function getNumberOfPages(rowCount, rowsPerPage) {
    return Math.ceil(rowCount / rowsPerPage);
  }

  function toPages(pages) {
    const results = [];

    for (let i = 1; i < pages; i++) {
      results.push(i);
    }

    return results;
  }

  const handleBackButtonClick = () => {
    onChangePage(currentPage - 1);
  };

  const handleNextButtonClick = () => {
    onChangePage(currentPage + 1);
  };

  const handlePageNumber = (e) => {
    onChangePage(Number(e.target.value));
  };

  const pages = getNumberOfPages(rowCount, rowsPerPage);
  const pageItems = toPages(pages);
  const nextDisabled = currentPage === pageItems.length;
  const previosDisabled = currentPage === 1;

  return (
    <nav>
      <ul className="pagination">
        <li className="page-item">
          <button
            className="page-link"
            onClick={handleBackButtonClick}
            disabled={previosDisabled}
            aria-disabled={previosDisabled}
            aria-label="previous page"
          >
            Previous
          </button>
        </li>
        {pageItems.map((page) => {
          const className =
            page === currentPage ? 'page-item active' : 'page-item';

          return (
            <li key={page} className={className}>
              <button
                className="page-link"
                onClick={handlePageNumber}
                value={page}
              >
                {page}
              </button>
            </li>
          );
        })}
        <li className="page-item">
          <button
            className="page-link"
            onClick={handleNextButtonClick}
            disabled={nextDisabled}
            aria-disabled={nextDisabled}
            aria-label="next page"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

const BootyCheckbox = React.forwardRef(({ onClick, ...rest }, ref) => (
  <div className="form-check">
    <input
      htmlFor="booty-check"
      type="checkbox"
      className="form-check-input"
      ref={ref}
      onClick={onClick}
      {...rest}
    />
    <label className="form-check-label" id="booty-check" />
  </div>
));
