import "./Error.css";

const Error = () => {
  return (
    <div className="c-loading c-body" style={{ height: "100vh" }}>
      <h1 className="">500</h1>
      <h2>
        Unexpected Error <b>:(</b>
      </h2>

      <div className="gears">
        <div className="gear one">
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
        <div className="gear two">
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
        <div className="gear three">
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </div>
    </div>
  );
};

export default Error;
