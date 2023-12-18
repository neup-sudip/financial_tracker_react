const Table = ({ heading = [], data, handleEdit, handleView }) => {
  const wordCapitalize = (str) => {
    return str
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/\b\w/g, (c) => c.toUpperCase());
  };

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
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={() => handleView(col?.categoryId)}
                            >
                              View
                            </button>
                            <button
                              type="button"
                              className="btn btn-info"
                              onClick={() => handleEdit(col?.categoryId)}
                            >
                              Edit
                            </button>
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