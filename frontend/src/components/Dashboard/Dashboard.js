import React, { useState, useEffect } from 'react';
import useToken from '../App/useToken';
import axios from 'axios';

import DataTable from 'react-data-table-component';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import 'bootstrap/dist/css/bootstrap.css';

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

  useEffect(() => {
    getAllIncidents();
  }, []);

  const columns = [
    {
      name: 'Type',
      selector: (row) => row.type,
      sortable: true,
    },
    {
      name: 'Detail',
      selector: (row) => row.detail,
      sortable: true,
    },
    {
      name: 'Assignee',
      selector: (row) => row.assignee,
      sortable: true,
    },
    {
      name: 'Status',
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: 'Created By',
      selector: (row) => row.created_by,
      sortable: true,
      right: true,
    },
    {
      name: 'Created At',
      selector: (row) => row.created_at,
      sortable: true,
      right: true,
    },
    {
      button: true,
      cell: () => (
        <div className="App">
          <div class="openbtn text-center">
            <button
              type="button"
              class="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#myModal"
            >
              Action
            </button>
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
                      <button>Assign</button>
                    </p>
                    <p>
                      <button>Acknowledge</button>
                    </p>
                    <p>
                      <button>Resolve</button>
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
        />
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
