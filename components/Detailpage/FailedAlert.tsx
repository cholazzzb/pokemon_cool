import Alert from "@components/Alert";

const FailedAlert = () => {
  return (
    <Alert level="danger" headText="Catching Pokemon">
      <div>FAILED!</div>
    </Alert>
  );
};

export default FailedAlert