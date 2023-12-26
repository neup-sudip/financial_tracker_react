import { wordCapitalize } from "../helpers/others/wordCapitalize";

const Table = ({
  heading = [],
  data,
  handleEdit,
  handleView,
  handleRemove,
  handleStatus,
}) => {
  return (
    <table className="table">
      <thead className="table-light">
        <tr>
          {heading &&
            heading?.map((head, idx) => (
              <th scope="col" key={idx}>
                {wordCapitalize(head)}
              </th>
            ))}
        </tr>
      </thead>

      <tbody>
        {data &&
          data?.map((col, idx) => (
            <tr key={idx}>
              {heading &&
                heading?.map((head, idx) => (
                  <td
                    className={`text-truncate ${
                      head === "status" && "text-center"
                    }`}
                    key={idx}
                  >
                    {head === "status" ? (
                      <>
                        {col[head] ? (
                          <span className="px-2 rounded-circle bg-success"></span>
                        ) : (
                          <span className="px-2 rounded-circle bg-danger"></span>
                        )}
                      </>
                    ) : (
                      <>
                        {head === "action" ? (
                          <span className="d-flex align-items-center justify-content-between ">
                            {handleView && (
                              <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => handleView(col?.id)}
                              >
                                View
                              </button>
                            )}
                            {handleEdit && (
                              <button
                                type="button"
                                className="btn btn-info"
                                onClick={() => handleEdit(col?.id)}
                              >
                                Edit
                              </button>
                            )}
                            {handleStatus && (
                              <button
                                type="button"
                                className={`btn ${
                                  col?.status ? "btn-danger" : "btn-success"
                                }`}
                                onClick={() =>
                                  handleStatus(col?.id, col?.status ? "R" : "A")
                                }
                              >
                                {col?.status ? "Inactive" : "Active"}
                              </button>
                            )}

                            {handleRemove && (
                              <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() => handleRemove(col?.id)}
                              >
                                Remove
                              </button>
                            )}
                          </span>
                        ) : (
                          <span> {col[head] || "--"}</span>
                        )}
                      </>
                    )}
                  </td>
                ))}
            </tr>
          ))}

        {data && data?.length < 1 && (
          <tr className="">
            <td className="text-center py-5 bg-white" colSpan={heading?.length}>
              <span className="text-light-emphasis">No record found</span>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default Table;
